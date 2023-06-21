import type { ReactElement } from 'react';
import type { NextPageWithLayout } from '../_app';

import Layout from '@/components/layout';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const Dashboard: NextPageWithLayout = () => {
	return <main className={`${inter.className}`}></main>;
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Dashboard;
