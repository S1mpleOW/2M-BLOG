export const theme = {
	primary: '#2EBAC1',
	secondary: '#A4D96C',
	grayDark: '#292D32',
	grayLight: '#E7ECF3',
	borderColor: '#999999',
	placeHolder: '#84878B',
	tertiary: '#3A1097',
	accent: '#00D1ED',
	grayF3: '#F3EDFF',
	gray6B: '#6b6b6b',
	gray23: '#232323',
	gray80: '#808191',
	error: '#FF0000',
};

export const postStatus = {
	APPROVED: 1,
	PENDING: 2,
	REJECTED: 3,
};

export const categoryStatus = {
	APPROVED: 1,
	UNAPPROVED: 2,
};

export const roles = {
	ADMIN: 1,
	MOD: 2,
	USER: 3,
};

export const userStatus = {
	ACTIVE: 1,
	PENDING: 2,
	BANNED: 3,
	LOCKED: 4,
	DELETED: 5,
};

export const permissions = {
	ADMIN: [],
	MOD: [],
	USER: ['READ_POST', 'CREATE_POST', 'UPDATE_POST', 'DELETE_POST'],
};

export const fonts = [
	'epilogue',
	'arial',
	'comic-sans',
	'courier-new',
	'georgia',
	'helvetica',
	'lucida',
	'roboto',
	'sans-serif',
];

export const ITEMS_PER_PAGE = 3;

export const API_STORE_IMAGE = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_API_KEY}`;

export const formatDate = (data) => {
	if (!data?.createdAt) return new Date().toLocaleDateString('vi-VI');
	return new Date(data.createdAt.seconds * 1000).toLocaleDateString('vi-VI');
};
