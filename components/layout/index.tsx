import React from 'react';
import { Sidebar } from '@/components';

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
			supportedWallets={[
				metamaskWallet(),
				walletConnect({ projectId: WALLET_CONNECT_ID }),
				localWallet({ persist: true }),
			]}
		>
			<NextUIProvider>
				<>
					<Sidebar />
					<main>{children}</main>
				</>
			</NextUIProvider>
		</ThirdwebProvider>
	);
};

export default Layout;
