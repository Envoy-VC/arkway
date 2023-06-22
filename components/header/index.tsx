import React from 'react';

import { Button, Input } from '@nextui-org/react';
import CustomConnectButton from '../custom-connect';
import { PaperPlus, Search } from 'react-iconly';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const Header = () => {
	return (
		<div
			className={`${inter.className} flex flex-row justify-between items-center p-8 shadow-sm`}
		>
			<div className='flex flex-row gap-2'>
				<Button
					light
					icon={<PaperPlus set='bold' primaryColor='#000000' size={24} />}
					className='text-md font-medium py-6'
				>
					Add file
				</Button>
				<Input
					clearable
					contentLeft={<Search set='light' primaryColor='#697177' size={20} />}
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
			<CustomConnectButton />
		</div>
	);
};

export default Header;
