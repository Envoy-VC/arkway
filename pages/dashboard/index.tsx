import React from 'react';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from '../_app';

import Layout from '@/components/layout';

import { Input, Button, Avatar, Loading } from '@nextui-org/react';
import { Upload, Edit } from 'react-iconly';

import { useAddress, useStorage } from '@thirdweb-dev/react';
import { usePolybase, useDocument } from '@polybase/react';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

type Profile = {
	name?: string;
	avatar?: string;
};

const Dashboard: NextPageWithLayout = () => {
	const address = useAddress();
	const storage = useStorage();

	const polybase = usePolybase();
	const { data, error, loading } = useDocument(
		polybase.collection('User').record(address!)
	);

	const [profile, setProfile] = React.useState<Profile>({
		name: data?.data.name || '',
		avatar: data?.data.avatar,
	});

	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			setIsLoading(true);
			const file = e.target.files![0];
			const uri = await storage!.upload(file, { uploadWithoutDirectory: true });
			setProfile({
				...profile,
				avatar: 'https://ipfs.io/ipfs/' + uri.split('ipfs://')[1],
			});
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const updateDetails = async () => {
		try {
			setIsLoading(true);
			const res = await polybase
				.collection('User')
				.record(address!)
				.call('updateUser', [
					profile.name ? profile.name : data?.data.name,
					profile.avatar ? profile.avatar : data?.data.avatar,
				]);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main className={`${inter.className} px-4 mx-auto mt-16`}>
			<div className='flex flex-col xl:flex-row w-full justify-start items-center gap-24'>
				<Input
					label='Display Name'
					initialValue={data?.data.name || ''}
					placeholder='Richard Hendricks'
					required
					size='xl'
					clearable
					className='mt-4 min-w-[300px]'
					onChange={(e) => setProfile({ ...profile, name: e.target.value })}
				/>

				<div className='flex flex-col justify-center items-center'>
					<Avatar
						src={
							profile.avatar
								? profile.avatar
								: data?.data.avatar ||
								  'https://nextui.org/images/card-example-3.jpeg'
						}
						className='w-60 h-60 rounded-full mb-4'
						alt='Profile Picture'
						color='primary'
						bordered
					/>
					<Button
						color='gradient'
						icon={<Upload set='bold' primaryColor='#fff' size={22} />}
						className='bg-[#9750DD] text-white mt-4 !max-w-[200px]'
						auto
					>
						<input
							type='file'
							className='max-w-[200px]'
							placeholder=''
							accept='image/*'
							onChange={(e) => handleFileChange(e)}
						/>
					</Button>
				</div>
			</div>
			<div className='flex w-full justify-center my-16 mb-48'>
				<Button
					auto
					light
					icon={!isLoading && <Edit set='bold' primaryColor='#fff' size={32} />}
					disabled={isLoading}
					size='lg'
					color='secondary'
					className='bg-[#9750DD] text-white mt-4 !w-fit'
					onPress={() => updateDetails()}
				>
					{isLoading ? <Loading color='currentColor' size='md' /> : 'Update'}
				</Button>
			</div>
		</main>
	);
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Dashboard;
