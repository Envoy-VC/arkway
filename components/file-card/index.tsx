import React from 'react';

import { useAddress, useStorage } from '@thirdweb-dev/react';
import { usePolybase, useDocument } from '@polybase/react';

import * as LitJsSdk from '@lit-protocol/lit-node-client';
import { blobToBase64String } from '@lit-protocol/lit-node-client';

import { Card, Image, Dropdown, Button } from '@nextui-org/react';
import { LitContext } from '../layout';
import { getFileSize, getDateTime, getFileIcon, isImage } from '@/services';

import { FileType } from '@/types';
import { VerticalDots } from '../icons';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const FileCard = ({
	name,
	size,
	createdAt,
	isStarred,
	isBookmarked,
	secret,
	encryptedMetadata,
}: FileType) => {
	const { litClient, state } = React.useContext(LitContext);
	const { authSig } = state;

	const address = useAddress();
	const storage = useStorage();

	const polybase = usePolybase();

	const { data, error, loading } = useDocument(
		polybase.collection('User').record(address!)
	);

	const addressAccessControl = [
		{
			contractAddress: '',
			standardContractType: '',
			chain: 'ethereum',
			method: '',
			parameters: [':userAddress'],
			returnValueTest: {
				comparator: '=',
				value: address!,
			},
		},
	];

	const handleDownload = () => {
		const link = document.createElement('a');
		link.download = name;
		link.href = secret;
		link.target = '_blank';
		link.click();
	};

	const handleDelete = async () => {
		const newFiles = data?.data?.files.filter(
			(file: string) => file !== encryptedMetadata
		);
		const res = await polybase
			.collection('User')
			.record(address!)
			.call('updateFiles', [[...newFiles]]);
		console.log(res);
	};

	const getEncryptedDataCid = async (metadata: string) => {
		console.log(authSig);
		const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
			metadata
		);

		const encryptedSymmetricKeyArray = await litClient?.saveEncryptionKey({
			accessControlConditions: addressAccessControl,
			symmetricKey,
			authSig,
			chain: 'ethereum',
		});
		const encryptedSymmetricKey = LitJsSdk.uint8arrayToString(
			encryptedSymmetricKeyArray!,
			'base16'
		);

		const encryptedBase64String = await blobToBase64String(encryptedString);

		const encryptedMetadataCid = await storage!.upload(
			{
				encryptedBase64String,
				encryptedSymmetricKey,
			},
			{
				uploadWithoutDirectory: true,
				alwaysUpload: false,
			}
		);

		return 'https://ipfs.io/ipfs/' + encryptedMetadataCid.slice(7);
	};

	const handleBookmarkAndStar = async (action: string) => {
		let newMetadata;
		if (action === 'bookmark') {
			newMetadata = {
				name: name,
				size: size,
				createdAt: createdAt,
				isStarred: isStarred,
				isBookmarked: !isBookmarked,
				secret: secret,
			};
		} else if (action === 'star') {
			newMetadata = {
				name: name,
				size: size,
				createdAt: createdAt,
				isStarred: !isStarred,
				isBookmarked: isBookmarked,
				secret: secret,
			};
		}

		const encryptedMetadataCid = await getEncryptedDataCid(
			JSON.stringify(newMetadata)
		);

		const newFiles = [
			...data?.data?.files.filter((file: string) => file !== encryptedMetadata),
			encryptedMetadataCid,
		];

		const res = await polybase
			.collection('User')
			.record(address!)
			.call('updateFiles', [[...newFiles]]);
		console.log(res);
	};

	const handleAction = async (actionKey: string) => {
		if (actionKey === 'download') {
			handleDownload();
		} else if (actionKey === 'delete') {
			console.log('deleting...');
			await handleDelete();
		} else if (actionKey === 'bookmark' || actionKey === 'star') {
			await handleBookmarkAndStar(actionKey);
		}
	};
	return (
		<Card
			isHoverable
			variant='flat'
			className={`${inter.className} shadow-sm rounded--[1.25rem] hover:bg-[#f7f9fc] transition-all duration-300 ease-in-out hover:shadow-none`}
			css={{
				mw: '286px',
				height: 'fit-content',
				backgroundColor: '#fff',
				border: '1px',
				'@hover': {
					shadow: '$xs',
					boxShadow: 'none',
				},
			}}
		>
			<Card.Header css={{ p: '0px', h: '144px' }}>
				{isImage(name) ? (
					<div className='relative !h-40 border-2'>
						<div className='absolute z-[10000] flex w-full p-6 justify-end'>
							<Dropdown placement='bottom-right'>
								<Dropdown.Trigger>
									<Button
										auto
										icon={<VerticalDots size={24} color='#A5A5A5' />}
										className='w-fit'
										size='md'
									/>
								</Dropdown.Trigger>
								<Dropdown.Menu
									aria-label='User menu actions'
									color='secondary'
									onAction={(actionKey) => handleAction(actionKey as string)}
								>
									<Dropdown.Item key='star'>
										{isStarred ? 'Remove Star' : 'Add Star'}
									</Dropdown.Item>
									<Dropdown.Item key='bookmark'>
										{isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
									</Dropdown.Item>
									<Dropdown.Item key='download'>Download</Dropdown.Item>
									<Dropdown.Item key='delete' withDivider color='error'>
										Delete
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</div>

						<div className='h-40'>
							<Image
								src={secret}
								alt='file'
								className='object-center h-40 min-w-[300px]'
								objectFit='cover'
							/>
						</div>
					</div>
				) : (
					<div className='flex justify-between items-start mt-0 w-full h-40 p-6'>
						<div className=''>
							<Image
								src={getFileIcon(name)!?.src}
								alt='file'
								className='relative'
								width={48}
								height={48}
							/>
						</div>
						<div>
							<Dropdown placement='bottom-right'>
								<Dropdown.Trigger>
									<Button
										auto
										icon={<VerticalDots size={24} color='#A5A5A5' />}
										className='w-fit'
										size='md'
									/>
								</Dropdown.Trigger>
								<Dropdown.Menu
									aria-label='User menu actions'
									color='secondary'
									onAction={(actionKey) => handleAction(actionKey as string)}
								>
									<Dropdown.Item key='star'>
										{isStarred ? 'Remove Star' : 'Add Star'}
									</Dropdown.Item>
									<Dropdown.Item key='bookmark'>
										{isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
									</Dropdown.Item>
									<Dropdown.Item key='download'>Download</Dropdown.Item>
									<Dropdown.Item key='delete' withDivider color='error'>
										Delete
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</div>
					</div>
				)}
			</Card.Header>
			<Card.Body>
				<div className='flex flex-col justify-between py-2 pb-6'>
					<span className='text-md font-bold'>
						{name.length > 20
							? name.slice(0, 15) + '...' + name.slice(name.length - 5)
							: name}
					</span>
					<span className='text-sm font-normal text-[#9B9B9B]'>
						{getDateTime(createdAt)}
					</span>
				</div>
			</Card.Body>
			<Card.Footer isBlurred className='bg-[#faf7fc]'>
				<div className='text-sm font-semibold py-0 px-2'>
					{getFileSize(size)}
				</div>
			</Card.Footer>
		</Card>
	);
};

export default FileCard;
