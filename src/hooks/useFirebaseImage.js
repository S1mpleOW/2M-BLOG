import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from 'firebaseSrc/firebase-config';
import notify from 'helper/notify';
import { useState } from 'react';

export default function useFirebaseImage(setFile, getValues, store = 'images/') {
	const [image, setImage] = useState('');
	const [progress, setProgress] = useState(0);

	if (!setFile || !getValues) {
		return;
	}
	const handleUploadImage = (file) => {
		if (!file) {
			return Promise.reject('File is required');
		}
		return new Promise((resolve) => {
			const storageRef = ref(storage, store + file.name);
			const uploadTask = uploadBytesResumable(storageRef, file);
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					setProgress(progress);
				},
				(error) => {
					console.log(error.message);
					notify('error', error.message);
					resolve(error);
				},
				async () => {
					const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
					console.log(downloadUrl);
					if (downloadUrl) {
						setImage(downloadUrl);
						resolve(downloadUrl);
					} else {
						notify('error', 'Something went wrong');
						resolve(false);
					}
				}
			);
		});
	};

	const handleSelectImage = (e) => {
		const file = e.target.files[0];
		console.log(file);
		if (!file) return;
		setFile((prev) => {
			if (prev.imageDelete) {
				file.imageDelete = prev.imageDelete;
			}
			return file;
		});
		setImage(URL.createObjectURL(file));
	};

	const handleDeleteImage = () => {
		const findName = /%2F(\S+)\?/gim.exec(image);
		const imageName = findName?.length > 0 ? findName[1] : '';
		setImage('');
		setFile(image ? { imageDelete: imageName } : {});
	};
	return {
		image,
		progress,
		setProgress,
		setImage,
		handleSelectImage,
		handleUploadImage,
		handleDeleteImage,
	};
}
