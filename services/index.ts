import { Image } from '@nextui-org/react';
import {
	pdfs,
	photos,
	documents,
	presentations,
	spreadsheets,
} from '@/public/icons';

export const getFileSize = (size: number) => {
	const i = Math.floor(Math.log(size) / Math.log(1024));
	return `${(size / Math.pow(1024, i)).toFixed(2)} ${
		['B', 'kB', 'MB', 'GB', 'TB'][i]
	}`;
};

export const getDateTime = (timestamp: number) => {
	const date = new Date(timestamp);
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
	const minutes = date.getMinutes();
	const minutesString = minutes < 10 ? `0${minutes}` : minutes;
	const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
	return `${day}/${month}/${year}, ${hours}:${minutesString} ${ampm}`;
};

// a function called getFileIcon that takes in a filename and returns an image based on the file extension
export const getFileIcon = (filename: string) => {
	const extension = filename.slice(filename.lastIndexOf('.') + 1);
	if (extension === 'pdf') {
		return pdfs;
	} else if (
		extension === 'doc' ||
		extension === 'docx' ||
		extension === 'txt'
	) {
		return documents;
	} else if (extension === 'ppt' || extension === 'pptx') {
		return presentations;
	} else if (extension === 'xls' || extension === 'xlsx') {
		return spreadsheets;
	} else {
		return null;
	}
};

export const isImage = (filename: string) => {
	const extension = filename.slice(filename.lastIndexOf('.') + 1);
	if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
		return true;
	} else {
		return false;
	}
};
