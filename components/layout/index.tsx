import React from 'react';
import { NavBar, Sidebar, Header } from '@/components';

import { NextUIProvider } from '@nextui-org/react';

import {
	ThirdwebProvider,
	metamaskWallet,
	walletConnect,
	localWallet,
} from '@thirdweb-dev/react';

import { PolybaseProvider } from '@polybase/react';
import { Polybase } from '@polybase/client';
import { Tabs } from '@/types';

import { WALLET_CONNECT_ID, POLYBASE_NAMESPACE } from '@/utils';

export const polybase = new Polybase({
	defaultNamespace: POLYBASE_NAMESPACE,
});

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	const [activeTab, setActiveTab] = React.useState<Tabs>('home');
	return (
		<ThirdwebProvider
			theme='light'
			supportedWallets={[
				metamaskWallet(),
				walletConnect({ projectId: WALLET_CONNECT_ID }),
				localWallet({ persist: true }),
			]}
		>
			<PolybaseProvider polybase={polybase}>
				<NextUIProvider>
					<>
						<NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
						<div className='flex flex-row'>
							<Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
							<div className='w-full flex flex-col'>
								<Header />
								{children}
							</div>
						</div>
					</>
				</NextUIProvider>
			</PolybaseProvider>
		</ThirdwebProvider>
	);
};

export default Layout;
