export const WALLET_CONNECT_ID =
	process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || '';

export const POLYBASE_NAMESPACE =
	process.env.NEXT_PUBLIC_POLYBASE_NAMESPACE || '';

export const acceptedFileTypes = {
	'image/png': ['.png'],
	'image/jpeg': ['.jpeg'],
	'application/msword': ['.doc'],
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
		'.docx',
	],
	'application/pdf': ['.pdf'],
	'application/vnd.ms-powerpoint': ['.ppt'],
	'application/vnd.openxmlformats-officedocument.presentationml.presentation': [
		'.pptx',
	],
	'application/vnd.ms-excel': ['.xls'],
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
		'.xlsx',
	],
};
