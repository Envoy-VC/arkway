import React from 'react';

import { Card } from '@nextui-org/react';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const FileCard = () => {
	return (
		<Card
			variant='flat'
			className={`${inter.className} shadow-sm`}
			css={{
				mw: '300px',
				height: 'fit-content',
				backgroundColor: '#fff',
				border: '1px',
			}}
		>
			<Card.Header css={{ p: '0px' }} className='pb-36'>
				<span>File Cover</span>
			</Card.Header>
			<Card.Body>
				<div className='flex flex-col justify-between'>
					<span className='text-xl font-bold'>File Name</span>
					<span className='text-md font-normal text-[#9B9B9B]'>
						Date Created
					</span>
				</div>
			</Card.Body>
			<Card.Footer className='bg-[#F0F0F0]'>
				<div className='text-md font-semibold py-2'>Size</div>
			</Card.Footer>
		</Card>
	);
};

export default FileCard;
