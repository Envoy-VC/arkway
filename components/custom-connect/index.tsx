import React from 'react';

import { useRouter } from 'next/navigation';
import { ConnectWallet, useAddress, useDisconnect } from '@thirdweb-dev/react';
import { Dropdown, Avatar, Button, Loading } from '@nextui-org/react';

import { usePolybase, useDocument } from '@polybase/react';

import { AddUser } from 'react-iconly';

const CustomConnectButton = () => {
	const router = useRouter();

	const address = useAddress();
	const disconnect = useDisconnect();

	const polybase = usePolybase();
	const { data, error, loading } = useDocument(
		polybase.collection('User').record(address!)
	);

	const [creating, setCreating] = React.useState<boolean>(false);

	const handleCreate = async () => {
		try {
			setCreating(true);
			const res = await polybase.collection('User').create([address!]);
		} catch (error) {
			console.log(error);
		} finally {
			setCreating(false);
		}
	};

	const handleAction = (actionKey: string) => {
		if (actionKey === '/logout') {
			disconnect();
			router.push('/');
		} else if (actionKey === '') {
			router.push('/dashboard');
		} else {
			router.push(actionKey);
		}
	};

	return (
		<div>
			{!address ? (
				<ConnectWallet className='!w-[200px] !rounded-xl !bg-[#7956da] !text-white !py-4' />
			) : data !== null ? (
				<Dropdown placement='bottom-right'>
					<Dropdown.Trigger>
						<Avatar
							bordered
							as='button'
							color='secondary'
							size='lg'
							src={
								data?.data.avatar ||
								'https://i.pravatar.cc/150?u=a042581f4e29026704d'
							}
						/>
					</Dropdown.Trigger>
					<Dropdown.Menu
						aria-label='User menu actions'
						color='secondary'
						onAction={(actionKey) => handleAction(actionKey as string)}
					>
						<Dropdown.Item key='none' className='h-12'>
							<div className='flex font-bold'>Signed in as</div>
							<div className='flex font-bold'>
								{data?.data.id.slice(0, 10) + '...' + data?.data.id.slice(35)}
							</div>
						</Dropdown.Item>
						<Dropdown.Item key='/' withDivider>
							My Cloud
						</Dropdown.Item>
						<Dropdown.Item key='/favorites'>Favorites</Dropdown.Item>
						<Dropdown.Item key='/bookmarks'>Bookmarks</Dropdown.Item>
						<Dropdown.Item key='/dashboard'>Dashboard</Dropdown.Item>
						<Dropdown.Item key='/logout' withDivider color='error'>
							Logout
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			) : (
				<Button
					auto
					className='text-md font-semibold text-white pl-6 bg-[#7956DA]'
					size='lg'
					icon={
						!creating && <AddUser set='bold' primaryColor='#fff' size={24} />
					}
					disabled={creating}
					onPress={handleCreate}
				>
					{creating ? <Loading size='md' color='white' /> : 'Create Account'}
				</Button>
			)}
		</div>
	);
};

export default CustomConnectButton;
