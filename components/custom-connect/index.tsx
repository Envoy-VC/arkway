import React from 'react';

import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import { Dropdown, Avatar } from '@nextui-org/react';

const CustomConnectButton = () => {
	const address = useAddress();
	return (
		<div>
			{!address ? (
				<ConnectWallet className='!w-[200px] !rounded-xl !bg-[#7956da] !text-white !py-4' />
			) : (
				<Dropdown placement='bottom-right'>
					<Dropdown.Trigger>
						<Avatar
							bordered
							as='button'
							color='secondary'
							size='lg'
							src={'https://i.pravatar.cc/150?u=a042581f4e29026704d'}
						/>
					</Dropdown.Trigger>
					<Dropdown.Menu
						aria-label='User menu actions'
						color='primary'
						onAction={(actionKey) => console.log(actionKey)}
					>
						<Dropdown.Item key='my-cloud'>My Cloud</Dropdown.Item>
						<Dropdown.Item key='favorites'>Favorites</Dropdown.Item>
						<Dropdown.Item key='bookmarks'>Bookmarks</Dropdown.Item>
						<Dropdown.Item key='dashboard'>Dashboard</Dropdown.Item>
						<Dropdown.Item key='logout' withDivider color='error'>
							Logout
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			)}
		</div>
	);
};

export default CustomConnectButton;
