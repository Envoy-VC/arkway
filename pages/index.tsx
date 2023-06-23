import type { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';

import { useSDK } from '@thirdweb-dev/react';
import { polybase } from '@/components/layout';

import Layout from '@/components/layout';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const Home: NextPageWithLayout = () => {
	const sdk = useSDK();
	polybase.signer(async (data: string) => {
		const sig = await sdk?.wallet.sign(data);
		if (sig) {
			return { h: 'eth-personal-sign', sig } as any;
		}
	});
	return <main className={`${inter.className}`}></main>;
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Home;
