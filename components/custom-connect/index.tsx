import React, { useContext } from 'react';

import { LitContext } from '../layout';
import {
	ConnectWallet,
	useAddress,
	useDisconnect,
	useSDK,
} from '@thirdweb-dev/react';
import { Dropdown, Avatar, Button, Loading } from '@nextui-org/react';
import { usePolybase, useDocument } from '@polybase/react';
import { AddUser, Password } from 'react-iconly';

import { ActionType } from '@/services/reducer';

const CustomConnectButton = () => {
	const { state, dispatch, litClient } = useContext(LitContext);

	const sdk = useSDK();
	const address = useAddress();
	const disconnect = useDisconnect();

	const polybase = usePolybase();
	const { data, error, loading } = useDocument(
		polybase.collection('User').record(address!)
	);

	const [creating, setCreating] = React.useState<boolean>(false);
	const [isAuthorizing, setIsAuthorizing] = React.useState<boolean>(false);

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

	const handleAuthorize = async () => {
		try {
			setIsAuthorizing(true);
			const message = 'Sign this message to authorize access to your account.';
			const sig = await sdk?.wallet.sign(message);
			if (!sig) return;
			const _authSig = {
				sig,
				derivedVia: 'sdk.userwallet.sign',
				signedMessage: message,
				address: address!,
			};
			dispatch({ type: ActionType.SET_AUTH_SIG, payload: _authSig });
		} catch (error) {
			console.log(error);
		} finally {
			setIsAuthorizing(false);
		}
	};

	const handleAction = (actionKey: string) => {
		if (actionKey === 'logout') {
			disconnect();
		}
	};

	const accountExists = () => {
		return data !== null && error?.code !== 'not-found';
	};

	if (!address) {
		return (
			<ConnectWallet className='!w-[200px] !rounded-xl !bg-[#7956da] !text-white !py-4' />
		);
	}

	if (address && !accountExists()) {
		return (
			<Button
				auto
				className='text-md font-semibold text-white pl-6 bg-[#7956DA]'
				size='lg'
				icon={!creating && <AddUser set='bold' primaryColor='#fff' size={24} />}
				disabled={creating}
				onPress={handleCreate}
			>
				{creating ? <Loading size='md' color='white' /> : 'Create Account'}
			</Button>
		);
	}

	if (address && accountExists() && !state?.authSig) {
		return (
			<Button
				auto
				className='text-md font-semibold text-white pl-6 bg-[#7956DA]'
				size='lg'
				icon={
					!isAuthorizing && (
						<Password set='bold' primaryColor='#fff' size={24} />
					)
				}
				disabled={isAuthorizing}
				onPress={handleAuthorize}
			>
				{isAuthorizing ? <Loading size='md' color='white' /> : 'Authorize'}
			</Button>
		);
	}

	if (address && accountExists() && state?.authSig) {
		return (
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
					<Dropdown.Item key='none' className='h-12 py-8'>
						<div className='flex font-bold'>Signed in as</div>
						<div className='flex font-bold'>
							{data?.data.id.slice(0, 10) + '...' + data?.data.id.slice(35)}
						</div>
					</Dropdown.Item>
					<Dropdown.Item key='logout' withDivider color='error'>
						Logout
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		);
	}
};

export default CustomConnectButton;
