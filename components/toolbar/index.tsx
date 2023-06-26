import React from 'react';

import { Button, Dropdown, Image } from '@nextui-org/react';
import { Filter2, InfoSquare, Paper } from 'react-iconly';

import Upload from '../upload';
import { FileType } from '@/types';
import { filterFiles } from '@/services';

import {
	pdfs,
	photos,
	documents,
	presentations,
	spreadsheets,
} from '@/public/icons';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

type DocumentTypes =
	| 'All'
	| 'PDFs'
	| 'Photos'
	| 'Documents'
	| 'Spreadsheets'
	| 'Presentations';

interface Props {
	decryptedFiles: FileType[];
	filteredFiles: FileType[];
	setFilteredFiles: React.Dispatch<React.SetStateAction<FileType[]>>;
}

const Toolbar = ({
	decryptedFiles,
	filteredFiles,
	setFilteredFiles,
}: Props) => {
	const [isFilterSelected, setIsFilterSelected] =
		React.useState<boolean>(false);
	const [selectedType, setSelectedType] = React.useState<DocumentTypes>('All');

	const filters = [
		{
			name: 'All',
			icon: <Paper set='light' primaryColor='#000' size={24} />,
		},
		{
			name: 'PDFs',
			icon: <Image src={pdfs.src} alt='PDFs' width={24} height={24} />,
		},
		{
			name: 'Photos',
			icon: <Image src={photos.src} alt='Photos' width={24} height={24} />,
		},
		{
			name: 'Documents',
			icon: (
				<Image src={documents.src} alt='Documents' width={24} height={24} />
			),
		},
		{
			name: 'Spreadsheets',
			icon: (
				<Image
					src={spreadsheets.src}
					alt='Spreadsheets'
					width={24}
					height={24}
				/>
			),
		},
		{
			name: 'Presentations',
			icon: (
				<Image
					src={presentations.src}
					alt='Presentations'
					width={24}
					height={24}
				/>
			),
		},
	];

	const handleFilter = (value: DocumentTypes) => {
		if (value === 'All') {
			setFilteredFiles(decryptedFiles);
		} else if (value === 'Documents') {
			setFilteredFiles(filterFiles(decryptedFiles, ['doc', 'docx']));
		} else if (value === 'PDFs') {
			setFilteredFiles(filterFiles(decryptedFiles, ['pdf']));
		} else if (value === 'Photos') {
			setFilteredFiles(filterFiles(decryptedFiles, ['png', 'jpg', 'jpeg']));
		} else if (value === 'Spreadsheets') {
			setFilteredFiles(filterFiles(decryptedFiles, ['xlsx', 'xls']));
		} else if (value === 'Presentations') {
			setFilteredFiles(filterFiles(decryptedFiles, ['ppt', 'pptx']));
		} else {
			setFilteredFiles(decryptedFiles);
		}
	};

	return (
		<div className={`${inter.className} flex flex-col bg-[#F6F6F6]`}>
			<div
				className={`${inter.className} flex flex-row justify-between items-center p-8`}
			>
				<span className='text-2xl font-semibold'>My Cloud</span>
				<div className='flex flex-row gap-4'>
					<Button
						auto
						icon={<Filter2 set='light' primaryColor='#000' />}
						className={`${isFilterSelected ? 'bg-[#e7c2ff]' : ''}`}
						onPress={() => setIsFilterSelected(!isFilterSelected)}
					/>
					<Button auto icon={<InfoSquare set='curved' primaryColor='#000' />} />
				</div>
			</div>
			{isFilterSelected && (
				<div className='px-8 mb-4'>
					<Dropdown>
						<Dropdown.Button
							bordered
							className='!w-fit text-black bg-white'
							css={{ borderColor: '#fff' }}
						>
							<div className='flex flex-row justify-start items-center gap-2'>
								{
									filters
										.filter((filter) => filter.name === selectedType)
										.at(0)!.icon
								}
								{
									filters
										.filter((filter) => filter.name === selectedType)
										.at(0)!.name
								}
							</div>
						</Dropdown.Button>
						<Dropdown.Menu
							aria-label='Single selection actions'
							color='primary'
							disallowEmptySelection
							selectionMode='single'
							selectedKeys={selectedType}
							onSelectionChange={(value: any) => {
								setSelectedType(value.currentKey);
								handleFilter(value.currentKey as DocumentTypes);
							}}
						>
							{filters.map((filter) => (
								<Dropdown.Item key={filter.name} icon={filter.icon}>
									{filter.name}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
				</div>
			)}
			<div className='flex xl:hidden px-[12px]'>
				<Upload />
			</div>
		</div>
	);
};

export default Toolbar;
