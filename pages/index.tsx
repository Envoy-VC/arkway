import type { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';

import Layout from '@/components/layout';
import NestedLayout from '@/components/layout/nested-layout';
import { Toolbar, FileCard } from '@/components';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const Home: NextPageWithLayout = () => {
	return (
		<main className={`${inter.className} bg-[#F6F6F6] h-full`}>
			<Toolbar />
			<div className='flex flex-row flex-wrap gap-4 items-center justify-around lg:justify-start p-8'>
				{Array(4)
					.fill(1)
					.map((_, i) => (
						<FileCard key={i} />
					))}
			</div>
		</main>
	);
};

Home.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			<NestedLayout>{page}</NestedLayout>
		</Layout>
	);
};

export default Home;
