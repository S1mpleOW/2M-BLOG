import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from 'firebaseSrc/firebase-config';
import { toast } from 'react-toastify';

export async function loginUsingEmailAndPassword({ email, password }) {
	try {
		await signInWithEmailAndPassword(auth, email, password);
		await updateProfile(auth?.currentUser, {
			displayName: auth?.currentUser?.displayName,
		});
		return true;
	} catch (err) {
		toast.error(err.message);
		console.log(err);
		return false;
	}
}
