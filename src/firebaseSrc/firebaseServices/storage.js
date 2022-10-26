import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from 'firebaseSrc/firebase-config';

export const uploadProgress = async (file, path) => {
	const storageRef = ref(storage, path);
	const uploadTask = uploadBytesResumable(storageRef, file);
	uploadTask.on(
		'state_changed',
		(snapshot) => {
			// Observe state change events such as progress, pause, and resume
			// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			console.log('Upload is ' + progress + '% done');
			switch (snapshot.state) {
				case 'paused':
					console.log('Upload is paused');
					break;
				case 'running':
					console.log('Upload is running');
					break;
				default:
					console.log('Upload is ' + snapshot.state);
					break;
			}
		},
		(error) => {
			console.log(error.message);
		}
	);
	return await getDownloadURL(storageRef);
};
