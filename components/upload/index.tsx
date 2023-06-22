import React from 'react';

import { useDropzone } from 'react-dropzone';
import { Button, Modal } from '@nextui-org/react';
import { PaperPlus, PaperUpload } from 'react-iconly';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const Upload = () => {
	const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		accept: {
			'image/png': ['.png'],
			'image/jpeg': ['.jpeg'],
			'application/msword': ['.doc'],
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
				['.docx'],
			'application/pdf': ['.pdf'],
			'application/vnd.ms-powerpoint': ['.ppt'],
			'application/vnd.openxmlformats-officedocument.presentationml.presentation':
				['.pptx'],
			'application/vnd.ms-excel': ['.xls'],
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
				'.xlsx',
			],
		},
	});

	const modalHandler = () => {
		setIsModalOpen(!isModalOpen);
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
						<div>
							{acceptedFiles.map((file, index) => (
								<div key={index}>{file.name}</div>
							))}
						</div>
					)}
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default Upload;
