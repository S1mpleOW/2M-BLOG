import { toast } from 'react-toastify';

export default function notify(type = 'success', message = '', settings = {}) {
	if (message && type) {
		toast[type](message, {
			position: 'top-right',
			autoClose: 4000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: false,
			...settings,
		});
	}
}
