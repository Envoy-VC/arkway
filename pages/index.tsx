import React, { useContext } from 'react';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';

import { useAddress, useStorage } from '@thirdweb-dev/react';
import { usePolybase, useDocument } from '@polybase/react';

import Layout from '@/components/layout';
import NestedLayout from '@/components/layout/nested-layout';
import { Toolbar, FileCard } from '@/components';
import * as LitJsSdk from '@lit-protocol/lit-node-client';
import { LitContext } from '@/components/layout';

import { base64StringToBlob } from '@lit-protocol/lit-node-client';

import { FileType } from '@/types';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const Home: NextPageWithLayout = () => {
	const { state, litClient } = useContext(LitContext);

	const address = useAddress();
	const storage = useStorage();

	const polybase = usePolybase();
	const { data, error, loading } = useDocument(
		polybase.collection('User').record(address!)
	);

	const [decryptedFiles, setDecryptedFiles] = React.useState<FileType[]>([]);
	const [filteredFiles, setFilteredFiles] = React.useState<FileType[]>([]);

	const addressAccessControl = [
		{
			contractAddress: '',
			standardContractType: '',
			chain: 'ethereum',
			method: '',
			parameters: [':userAddress'],
			returnValueTest: {
				comparator: '=',
				value: address!,
			},
		},
	];

	React.useEffect(() => {
		const resolveFiles = async () => {
			const files = data?.data.files;
			if (files) {
				const resolvedFiles: FileType[] = await Promise.all(
					files.map(async (uri: string) => {
						const res = await storage!.downloadJSON(uri);
						const decryptFile = async () => {
							const { encryptedBase64String, encryptedSymmetricKey } = res;
							const symmetricKey = await litClient!.getEncryptionKey({
								accessControlConditions: addressAccessControl,
								toDecrypt: encryptedSymmetricKey,
								chain: 'ethereum',
								authSig: state?.authSig,
							});
							const encryptedString = await base64StringToBlob(
								encryptedBase64String
							);
							const decryptedString = await LitJsSdk.decryptString(
								encryptedString,
								symmetricKey
							);
							return {
								...JSON.parse(decryptedString),
								encryptedMetadata: uri,
							};
						};
						const metadataArr = await decryptFile();
						return metadataArr;
					})
				);
				setDecryptedFiles(resolvedFiles);
				setFilteredFiles(resolvedFiles);
				console.log(resolvedFiles);
			}
		};
		if (state?.authSig && litClient) {
			resolveFiles();
		}
	}, [data?.data.files, state.authSig, litClient]);

	return (
		<main className={`${inter.className} bg-[#F6F6F6] h-full`}>
			<Toolbar />
			{filteredFiles && state.authSig && address && (
				<div className='flex flex-row flex-wrap gap-4 items-center justify-around lg:justify-start p-8'>
					{filteredFiles
						.sort((a, b) => b.createdAt - a.createdAt)
						.map((file: FileType, index: number) => (
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
