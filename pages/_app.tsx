import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import { NextUIProvider } from '@nextui-org/react';

import {
	ThirdwebProvider,
	metamaskWallet,
	walletConnect,
	localWallet,
} from '@thirdweb-dev/react';

import { WALLET_CONNECT_ID } from '@/utils';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThirdwebProvider
			supportedWallets={[
				metamaskWallet(),
				walletConnect({ projectId: WALLET_CONNECT_ID }),
				localWallet({ persist: true }),
			]}
		>
			<NextUIProvider>
				<Component {...pageProps} />
			</NextUIProvider>
		</ThirdwebProvider>
	);
}
