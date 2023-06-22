import React from 'react';
import { NavBar, Sidebar, Header, Toolbar } from '@/components';

import { NextUIProvider } from '@nextui-org/react';

import {
	ThirdwebProvider,
	metamaskWallet,
	walletConnect,
	localWallet,
} from '@thirdweb-dev/react';

import { WALLET_CONNECT_ID } from '@/utils';

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<ThirdwebProvider
			theme='light'
			supportedWallets={[
				metamaskWallet(),
				walletConnect({ projectId: WALLET_CONNECT_ID }),
				localWallet({ persist: true }),
			]}
		>
			<NextUIProvider>
				<>
					<NavBar />
					<div className='flex flex-row'>
						<Sidebar />
						<div className='w-full flex flex-col'>
							<Header />
							<Toolbar />
							{children}
						</div>
					</div>
				</>
			</NextUIProvider>
		</ThirdwebProvider>
	);
};

export default Layout;
