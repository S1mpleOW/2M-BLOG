import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from 'firebaseSrc/firebase-config';
import { setDocument } from 'firebaseSrc/firebaseServices/firestore';
import notify from 'helper/notify';
import { toast } from 'react-toastify';
import { roles, userStatus } from 'utils/constants';

const addUserToDB = ({ uid, displayName, username, email, role, status, avatar, description }) => {
	return new Promise((resolve) => {
		(async () => {
			try {
				const existUser = query(collection(db, 'users'), where('uid', '==', uid));
				const querySnapshot = await getDocs(existUser);
				if (querySnapshot.empty) {
					await setDocument('users', uid, {
						displayName,
						email,
						avatar,
						uid,
						username: username ? username : displayName,
						role: role ? role : roles['USER'],
						status: status ? status : userStatus['PENDING'],
						description,
					})
						.then(() => {
							toast.success('Successfully registered');
							resolve(true);
						})
						.catch((err) => {
							console.log(err);
							toast.error('Error while registering');
							resolve(false);
						});
				} else {
					console.log('User already exist');
					notify('error', 'User already registered');
					resolve(false);
				}
			} catch (e) {
				console.log(e);
				resolve(false);
			}
		})();
	});
};

export async function registerUsingEmailAndPassword({
	email,
	password,
	displayName,
	username,
	role,
	status,
	description = '',
	avatar = '',
}) {
	return new Promise((resolve) => {
		(async () => {
			try {
				await createUserWithEmailAndPassword(auth, email, password)
					.then(async () => {
						let uid = false;
						await updateProfile(auth?.currentUser, {
							displayName,
							photoURL: avatar,
						});
						uid = auth?.currentUser?.uid;
						const response = await addUserToDB({
							uid,
							displayName,
							username,
							email,
							role,
							status,
							avatar,
							description,
						});
						if (response) {
							resolve(uid);
						} else {
							resolve(false);
						}
					})
					.catch((e) => {
						notify('error', e.message);
						resolve(false);
					});
			} catch (error) {
				toast.error(error.message);
				resolve(false);
			}
		})();
	});
}
