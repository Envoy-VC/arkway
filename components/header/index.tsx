import React from 'react';

import { Button, Input } from '@nextui-org/react';
import CustomConnectButton from '../custom-connect';
import { PaperPlus, Search } from 'react-iconly';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const Header = () => {
	return (
		<div
			className={`${inter.className} hidden xl:flex flex-row justify-between items-center p-8 py-4 shadow-sm`}
		>
			<div className='flex flex-row gap-4 w-fit items-center'>
				<Button
					auto
					light
					icon={<PaperPlus set='bold' primaryColor='#000000' size={24} />}
					className='font-medium py-6 z-0'
				>
					Add file
				</Button>
				<Input
					clearable
					contentLeft={<Search set='light' primaryColor='#697177' size={20} />}
					aria-label='Search'
					contentLeftStyling={false}
					className='w-[300px] hidden lg:flex'
					css={{
						'& .nextui-input-content--left': {
							h: '100%',
							ml: '$4',
							dflex: 'center',
						},
					}}
					placeholder='Search...'
				/>
			</div>
			<div className='hidden xl:flex'>
				<CustomConnectButton />
			</div>
		</div>
	);
};

export default Header;
