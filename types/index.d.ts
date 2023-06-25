export type Tabs = 'home' | 'favorites' | 'bookmarks' | 'dashboard' | 'logout';

export type FileType = {
	name: string;
	size: number;
	createdAt: number;
	isStarred: boolean;
	isBookmarked: boolean;
	secret: string;
	encryptedMetadata?: string;
};

export type AuthSig = {
	sig: any;
	derivedVia: string;
	signedMessage: string;
	address: string;
};
