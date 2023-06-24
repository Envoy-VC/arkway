import React from 'react';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';

import { useAddress, useStorage } from '@thirdweb-dev/react';
import { usePolybase, useDocument } from '@polybase/react';

import Layout from '@/components/layout';
import NestedLayout from '@/components/layout/nested-layout';
import { Toolbar, FileCard } from '@/components';

import { FileType } from '@/types';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const Home: NextPageWithLayout = () => {
	const address = useAddress();
	const storage = useStorage();

	const polybase = usePolybase();
	const { data, error, loading } = useDocument(
		polybase.collection('User').record(address!)
	);

	const [decryptedFiles, setDecryptedFiles] = React.useState<FileType[]>([]);
	const [filteredFiles, setFilteredFiles] = React.useState<FileType[]>([]);

	React.useEffect(() => {
		const resolveFiles = async () => {
			// loop through data.data.files and resolve each url and then wait for its completion and then at store it into array and setFiltered files
			const files = data?.data.files;
			if (files) {
				const resolvedFiles: FileType[] = await Promise.all(
					files.map(async (uri: string) => {
						const file: FileType = await storage!.downloadJSON(uri);
						return file;
					})
				);
				setFilteredFiles(resolvedFiles);
				console.log(resolvedFiles);
			}
		};
		resolveFiles();
	}, [data?.data.files]);

	return (
		<main className={`${inter.className} bg-[#F6F6F6] h-full`}>
			<Toolbar />
			{filteredFiles && (
				<div className='flex flex-row flex-wrap gap-4 items-center justify-around lg:justify-start p-8'>
					{filteredFiles.map((file: FileType, index: number) => (
						<FileCard key={index} {...file} />
					))}
				</div>
			)}
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
