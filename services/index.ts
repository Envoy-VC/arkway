export const getFileSize = (size: number) => {
	const i = Math.floor(Math.log(size) / Math.log(1024));
	return `${(size / Math.pow(1024, i)).toFixed(2)} ${
		['B', 'kB', 'MB', 'GB', 'TB'][i]
	}`;
};

export const getDateTime = (timestamp: number) => {
	const date = new Date(timestamp * 1000);
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
	const minutes = date.getMinutes();
	const minutesString = minutes < 10 ? `0${minutes}` : minutes;
	const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
	return `${day}/${month}/${year}, ${hours}:${minutesString} ${ampm}`;
};
