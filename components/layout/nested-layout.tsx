import React from 'react';
import { useSDK } from '@thirdweb-dev/react';
import { polybase } from '@/components/layout';

interface Props {
	children: React.ReactNode;
}

const NestedLayout = ({ children }: Props) => {
	const sdk = useSDK();

	polybase.signer(async (data: string) => {
		const sig = await sdk?.wallet.sign(data);
		if (sig) {
			return { h: 'eth-personal-sign', sig } as any;
		}
	});

	return <>{children}</>;
};

export default NestedLayout;
