import React from 'react';

import { useRouter } from 'next/navigation';
import { useDisconnect } from '@thirdweb-dev/react';
import { Navbar, Button } from '@nextui-org/react';
import CustomConnectButton from '../custom-connect';

import { Bookmark, Folder, Logout, Setting, Star } from 'react-iconly';

import { Tabs } from '@/types';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const NavBar = () => {
	const router = useRouter();
	const disconnect = useDisconnect();

	const [activeTab, setActiveTab] = React.useState<Tabs>('home');
	const tabs = [
		{
			name: 'home',
			content: 'My Cloud',
			icon: (
				<Folder
					set='bold'
					primaryColor={activeTab === 'home' ? '#583DA1' : '#000'}
					size={24}
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
					primaryColor={activeTab === 'favorites' ? '#583DA1' : '#000'}
					size={24}
				/>
			),
			link: '/favorites',
		},
		{
			name: 'bookmarks',
			content: 'Bookmarks',
			icon: (
				<Bookmark
					set='bold'
					primaryColor={activeTab === 'bookmarks' ? '#583DA1' : '#000'}
					size={24}
				/>
			),
			link: '/bookmarks',
		},
		{
			name: 'dashboard',
			content: 'Dashboard',
			icon: (
				<Setting
					set='bold'
					primaryColor={activeTab === 'dashboard' ? '#583DA1' : '#000'}
					size={24}
				/>
			),
			link: '/dashboard',
		},
		{
			name: 'logout',
			content: 'Logout',
			icon: <Logout set='bold' primaryColor='#F31260' size={24} />,
		},
	];

	const handleClick = (tab: Tabs) => {
		setActiveTab(tab);
		if (tab === 'logout') {
			disconnect();
		} else {
			router.push(tab === 'home' ? '/' : `/${tab}`);
		}
	};

	return (
		<Navbar isBordered variant='sticky' className='flex xl:hidden'>
			<Navbar.Toggle showIn='lg' />
			<Navbar.Brand>
				<span className={`${inter.className} text-xl font-bold`}>ARKWAY</span>
			</Navbar.Brand>
			<Navbar.Content
				css={{
					'@xs': {
						w: '12%',
						jc: 'flex-end',
					},
				}}
			>
				<CustomConnectButton />
			</Navbar.Content>
			<Navbar.Collapse>
				{tabs.map((tab, index) => (
					<Navbar.CollapseItem
						key={index}
						activeColor='secondary'
						isActive={index === 2}
					>
						<Button
							key={index}
							light
							size='lg'
							onPress={() => handleClick(tab.name as Tabs)}
							icon={tab.icon}
							className={`text-md justify-start pl-16 w-full py-6 rounded-3xl ${
								activeTab === 'logout'
									? 'text-[#F31260]'
									: activeTab === tab.name
									? 'text-[#583DA1]'
									: 'text-black'
							}`}
						>
							{tab.content}
						</Button>
					</Navbar.CollapseItem>
				))}
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavBar;
