import React, { createContext } from 'react';
import { useAddress, useSDK } from '@thirdweb-dev/react';
import { polybase } from '@/components/layout';
import * as LitJsSdk from '@lit-protocol/lit-node-client';

type LitContextType = {
	client?: LitJsSdk.LitNodeClient;
	authSig?: AuthSig;
	setAuthSig?: React.Dispatch<React.SetStateAction<AuthSig | undefined>>;
};

export const LitContext = createContext({} as LitContextType);

export interface AuthSig {
	sig: any;
	derivedVia: string;
	signedMessage: string;
	address: string;
}
interface Props {
	children: React.ReactNode;
}

const NestedLayout = ({ children }: Props) => {
	const address = useAddress();
	const sdk = useSDK();
	const [litClient, setLitClient] = React.useState<LitJsSdk.LitNodeClient>();
	const [authSig, setAuthSig] = React.useState<AuthSig>();

	const addressAccessControl = [
		{
			contractAddress: '',
			standardContractType: '',
			chain: 'ethereum',
			method: '',
			parameters: [':userAddress'],
			returnValueTest: {
				comparator: '=',
				value: address,
			},
		},
	];

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

	polybase.signer(async (data: string) => {
		const sig = await sdk?.wallet.sign(data);
		if (sig) {
			return { h: 'eth-personal-sign', sig } as any;
		}
	});
	return (
		<LitContext.Provider
			value={{ client: litClient, authSig: authSig, setAuthSig: setAuthSig! }}
		>
			{children}
		</LitContext.Provider>
	);
};

export default NestedLayout;
