import React from 'react';

import { Card, Image } from '@nextui-org/react';
import { getFileSize, getDateTime } from '@/services';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const FileCard = () => {
	return (
		<Card
			variant='flat'
			className={`${inter.className} shadow-sm rounded-[2.25rem]`}
			css={{
				mw: '300px',
				height: 'fit-content',
				backgroundColor: '#fff',
				border: '0px',
			}}
		>
			<Card.Header css={{ p: '0px', h: '160px' }}>
				<Image
					src='https://nextui.org/images/card-example-2.jpeg'
					alt='file'
					className=''
					objectFit='fill'
				/>
			</Card.Header>
			<Card.Body>
				<div className='flex flex-col justify-between py-2 pb-6'>
					<span className='text-xl font-bold'>File Name</span>
					<span className='text-md font-normal text-[#9B9B9B]'>
						{getDateTime(1687559940)}
					</span>
				</div>
			</Card.Body>
			<Card.Footer isBlurred className='bg-[#f0f0f0]'>
				<div className='text-md font-semibold py-2 px-2'>
					{getFileSize(10548012)}
				</div>
			</Card.Footer>
		</Card>
	);
};

export default FileCard;
