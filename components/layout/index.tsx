import React, { createContext, useReducer } from 'react';
import { NavBar, Sidebar, Header } from '@/components';

import { NextUIProvider } from '@nextui-org/react';

import {
	ThirdwebProvider,
	metamaskWallet,
	walletConnect,
	localWallet,
} from '@thirdweb-dev/react';

import { SEO } from '@/components';

import { PolybaseProvider } from '@polybase/react';
import { Polybase } from '@polybase/client';
import * as LitJsSdk from '@lit-protocol/lit-node-client';
import { AuthSig } from '@/types';
import { SetAuthSig, reducer } from '@/services/reducer';

const initialState = {};

export type LitState = {
	authSig?: AuthSig;
};

export const LitContext = createContext<{
	state: LitState;
	dispatch: React.Dispatch<SetAuthSig>;
	litClient: LitJsSdk.LitNodeClient | undefined;
}>({ state: initialState, dispatch: () => undefined, litClient: undefined });

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
	const [litClient, setLitClient] = React.useState<LitJsSdk.LitNodeClient>();

	const [state, dispatch] = useReducer(reducer, initialState);

	React.useEffect(() => {
		const connectToLit = async () => {
			const client = new LitJsSdk.LitNodeClient({
				litNetwork: 'serrano',
				debug: true,
			});
			await client.connect();
			return client;
		};

		connectToLit().then(async (lc) => {
			setLitClient(lc);
		});
	}, []);
	return (
		<ThirdwebProvider
			theme='light'
			dAppMeta={{
				name: 'Arkway',
				description:
					'Store, Encrypt, and Access Your Documents Anytime, Anywhere.',
				logoUrl:
					'https://ipfs.io/ipfs/QmWo2sGeNupqKBJ8hVFZUydCSrDo7usbnCn4T2fduuXTs6',
				url: 'https://arkway.vercel.app',
				isDarkMode: false,
			}}
			supportedWallets={[
				metamaskWallet(),
				walletConnect({ projectId: WALLET_CONNECT_ID }),
				localWallet({ persist: true }),
			]}
		>
			<PolybaseProvider polybase={polybase}>
				<LitContext.Provider value={{ state, dispatch, litClient }}>
					<NextUIProvider>
						<>
							<SEO />
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
				</LitContext.Provider>
			</PolybaseProvider>
		</ThirdwebProvider>
	);
};

export default Layout;
