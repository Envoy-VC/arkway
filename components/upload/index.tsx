import React from 'react';

import { useDropzone } from 'react-dropzone';
import { useAddress, useStorage } from '@thirdweb-dev/react';
import { Button, Modal, Progress } from '@nextui-org/react';
import { PaperPlus, PaperUpload, Upload as UploadFile } from 'react-iconly';

import { usePolybase, useDocument } from '@polybase/react';

import { acceptedFileTypes } from '@/utils';
import { FileType } from '@/types';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const Upload = () => {
	const address = useAddress();
	const storage = useStorage();

	const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		accept: acceptedFileTypes,
	});

	const [isUploading, setIsUploading] = React.useState<boolean>(false);
	const [uploadProgress, setUploadProgress] = React.useState<number>(0);

	const polybase = usePolybase();
	const { data, error, loading } = useDocument(
		polybase.collection('User').record(address!)
	);

	const modalHandler = () => {
		setIsUploading(false);
		acceptedFiles.length = 0;
		setUploadProgress(0);
		setIsModalOpen(!isModalOpen);
	};

	const handleUpload = async () => {
		try {
			setIsUploading(true);
			if (acceptedFiles.length === 0) return;
			if (acceptedFiles.length === 1) {
				const file = acceptedFiles[0];
				const fileCid = await storage!.upload(file, {
					uploadWithoutDirectory: true,
					alwaysUpload: false,
					onProgress: (progress) => {
						setUploadProgress(
							Number((progress.progress / progress.total) * 100)
						);
					},
				});
				const metadata: FileType = {
					name: file.name,
					size: file.size,
					createdAt: Date.now(),
					isStarred: false,
					isBookmarked: false,
					secret: 'https://ipfs.io/ipfs/' + fileCid.slice(7),
				};

				const ipfsHash = await storage!.upload(JSON.stringify(metadata), {
					uploadWithoutDirectory: true,
					alwaysUpload: false,
				});
				const res = await polybase
					.collection('User')
					.record(address!)
					.call('addFile', ['https://ipfs.io/ipfs/' + ipfsHash.slice(7)]);
			} else {
				const uris = await storage!.uploadBatch(acceptedFiles, {
					alwaysUpload: true,
					onProgress: (progress) => {
						setUploadProgress(
							Number((progress.progress / progress.total) * 100)
						);
					},
				});

				const metadata: FileType[] = [];
				for (let i = 0; i < acceptedFiles.length; i++) {
					const file = acceptedFiles[i];
					metadata.push({
						name: file.name,
						size: file.size,
						createdAt: Date.now(),
						isStarred: false,
						isBookmarked: false,
						secret: 'https://ipfs.io/ipfs/' + uris.at(i)!.slice(7),
					});
				}

				let arr: string[] = [];

				const cids = await storage!
					.uploadBatch(metadata, {
						uploadWithoutDirectory: false,
						alwaysUpload: false,
					})
					.then(
						(res) =>
							(arr = res.map((hash) => 'https://ipfs.io/ipfs/' + hash.slice(7)))
					);

				const res = await polybase
					.collection('User')
					.record(address!)
					.call('updateFiles', [[...data?.data.files, ...arr]]);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsUploading(false);
			acceptedFiles.length = 0;
			setUploadProgress(0);
		}
	};

	return (
		<div>
			<Button
				auto
				light
				icon={<PaperPlus set='bold' primaryColor='#000000' size={24} />}
				className='font-medium py-6 z-0'
				onPress={() => modalHandler()}
			>
				Add files
			</Button>
			<Modal
				preventClose
				closeButton
				aria-labelledby='Upload Files'
				open={isModalOpen}
				onClose={modalHandler}
			>
				<Modal.Header justify='flex-start' autoMargin={false}>
					<div
						className={`${inter.className} flex flex-row text-lg items-center gap-2 font-semibold`}
					>
						<PaperUpload set='light' primaryColor='#000000' size={28} />
						Upload Files
					</div>
				</Modal.Header>
				<Modal.Body>
					<div
						{...getRootProps({
							className:
								'flex flex-col items-center p-6 border-2 rounded-md border-[#eeeeee] border-dashed bg-[#fafafa] text-[#000] hover:border-[#000000] transition duration-300 ease-in-out',
						})}
					>
						<input {...getInputProps()} />
						<p>
							Drag &lsquo;n&lsquo; drop files here, or click to select files
						</p>
					</div>

					{acceptedFiles.length > 0 && (
						<div className='flex flex-col'>
							<span className='text-lg font-semibold'>Files</span>
							{acceptedFiles.map((file, index) => (
								<div key={index} className='mt-2'>
									{file.name.length > 50
										? file.name.slice(0, 40) +
										  '...' +
										  file.name.slice(file.name.length - 10)
										: file.name}
								</div>
							))}
						</div>
					)}

					{!isUploading ? (
						<Button
							auto
							className='text-white w-fit mx-auto text-lg font-medium bg-[#7828C8]'
							icon={<UploadFile set='light' primaryColor='#fff' />}
							onPress={handleUpload}
						>
							Upload
						</Button>
					) : (
						<div className='flex flex-row gap-2 items-center'>
							<Progress
								indeterminated={uploadProgress === 100}
								value={uploadProgress}
								color='secondary'
								status='secondary'
							/>
							<div>{`${Math.floor(uploadProgress)}%`}</div>
						</div>
					)}
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default Upload;
