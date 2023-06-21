import React from 'react';

import { Button } from '@nextui-org/react';
import CustomConnectButton from '../custom-connect';
import { PaperPlus } from 'react-iconly';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const Header = () => {
	return (
		<div
			className={`${inter.className} flex flex-row justify-between items-center p-8 shadow-sm`}
		>
			<Button
				light
				icon={<PaperPlus set='bold' primaryColor='#000000' size={24} />}
				className='text-md font-medium py-6'
			>
				Add file
			</Button>
			<CustomConnectButton />
		</div>
	);
};

export default Header;
