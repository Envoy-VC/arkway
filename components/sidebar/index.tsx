import React from 'react';
import { Avatar, Button } from '@nextui-org/react';
import { useAddress, useDisconnect } from '@thirdweb-dev/react';
import { useRouter } from 'next/navigation';

import { Bookmark, Folder, Logout, Star } from 'react-iconly';

export type Tabs = 'home' | 'favorites' | 'bookmarks';

const Sidebar = () => {
	const [activeTab, setActiveTab] = React.useState<Tabs>('home');
	const router = useRouter();
	const address = useAddress();
	const disconnect = useDisconnect();

	const tabs = [
		{
			name: 'home',
			content: 'My Cloud',
			icon: (
				<Folder
					set='bold'
					primaryColor={activeTab === 'home' ? '#E0E1E2' : '#9CA3AF'}
					size={26}
				/>
			),
			link: '/',
		},
		{
			name: 'favorites',
			content: 'Favorites',
			icon: (
				<Star
					set='bold'
					primaryColor={activeTab === 'favorites' ? '#E0E1E2' : '#9CA3AF'}
					size={26}
				/>
			),
			link: '/',
		},
		{
			name: 'bookmarks',
			content: 'Bookmarks',
			icon: (
				<Bookmark
					set='bold'
					primaryColor={activeTab === 'bookmarks' ? '#E0E1E2' : '#9CA3AF'}
					size={26}
				/>
			),
			link: '/',
		},
	];

	const handleClick = (tab: Tabs) => {
		router.push(tab === 'home' ? '/' : `/${tab}`);
	};

	return (
		<div className='hidden xl:flex flex-col h-screen !w-[324px] bg-[#11131a] justify-between items-center px-4'>
			<div className='flex flex-col w-full'>
				<Avatar
					size='lg'
					text='mecrypt'
					color='primary'
					bordered
					squared
					className='my-8 mx-8'
				/>
				<div className='w-full flex flex-col gap-4 mt-24'>
					{tabs.map((tab, index) => (
						<Button
							key={index}
							light
							size='lg'
							onPress={() => setActiveTab(tab.name as Tabs)}
							icon={tab.icon}
							className={`text-white text-lg  w-full py-8 rounded-3xl ${
								activeTab === tab.name
									? 'bg-[#583DA1] text-white font-medium'
									: 'text-gray-400 font-normal'
							}`}
						>
							{tab.content}
						</Button>
					))}
				</div>
			</div>
			<div className='my-8'>
				<Button
					size='lg'
					light
					onPress={disconnect}
					disabled={!address}
					icon={<Logout set='bold' primaryColor='#9CA3AF' size={26} />}
					className='text-gray-300 text-lg'
				>
					Log out
				</Button>
			</div>
		</div>
	);
};

export default Sidebar;
