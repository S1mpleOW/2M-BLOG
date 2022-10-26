import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'components/button';
import { Radio } from 'components/checkbox';
import { Field, FieldCheckboxs } from 'components/field';
import { ImageUpload, Progress } from 'components/image';
import { Input } from 'components/input';
import { Label } from 'components/label';
import { LoadingSpinner } from 'components/loading';
import { Textarea } from 'components/textarea';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { db, storage } from 'firebaseSrc/firebase-config';
import notify from 'helper/notify';
import useFirebaseImage from 'hooks/useFirebaseImage';
import { DashboardHeading } from 'modules/dashboard';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { roles, userStatus } from 'utils/constants';
import * as yup from 'yup';

const schema = yup.object().shape({
	fullname: yup.string().required('Name is required'),
	username: yup.string().required('Username is required'),
	email: yup.string().email("Email isn't valid").required('Email is required'),
	status: yup.number().oneOf(Object.values(userStatus)).required('Status is required'),
	role: yup.number().oneOf(Object.values(roles)).required('Role is required'),
	avatar: yup.string(),
	description: yup.string(),
});

const UserUpdate = () => {
	const {
		control,
		formState: { isSubmitting, isValid },
		watch,
		handleSubmit,
		reset,
		getValues,
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			avatar: '',
			fullname: '',
			username: '',
			email: '',
			role: roles['USER'],
			status: userStatus['PENDING'],
			description: '',
		},
		resolver: yupResolver(schema),
	});
	const watchStatus = watch('status');
	const watchRole = watch('role');
	const [file, setFile] = useState({});
	const {
		setImage,
		setProgress,
		image,
		progress,
		handleUploadImage,
		handleSelectImage,
		handleDeleteImage,
	} = useFirebaseImage(setFile, getValues, 'users/');
	console.log(image);
	const [isLoading, setIsLoading] = useState(false);
	const [query] = useSearchParams();
	const id = query.get('id');
	useEffect(() => {
		if (!id) return;
		setIsLoading(true);
		(async () => {
			const docRef = doc(db, 'users', id);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const {
					username,
					email,
					role,
					status,
					avatar,
					displayName: fullname,
					description,
				} = docSnap.data();
				reset({
					username,
					email,
					role,
					status,
					fullname,
					description,
				});
				if (avatar) {
					setImage(avatar);
				}
			}
			setIsLoading(false);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const handleReset = () => {
		setFile({});
		setImage('');
		setProgress(0);
	};

	const updateUserHandler = (data) => {
		if (!isValid || !id) {
			return;
		}
		return new Promise((resolve) => {
			const timeOut = setTimeout(async () => {
				const param = { ...data, displayName: data.fullname, avatar: image };
				await updateDoc(doc(db, 'users', id), {
					...param,
					updatedAt: serverTimestamp(),
				})
					.then(async () => {
						console.log(file);
						if (file) {
							if (file.name) {
								await handleUploadImage(file).then(async (image) => {
									const docRef = doc(db, 'users', id);
									await updateDoc(docRef, { avatar: image });
								});
							}
							if (file.imageDelete) {
								const storageRef = ref(storage, 'users/' + file.imageDelete);
								await deleteObject(storageRef);
							}
						}
					})
					.then(() => {
						reset({
							avatar: '',
							fullname: '',
							username: '',
							email: '',
							password: '',
							role: roles['USER'],
							status: userStatus['PENDING'],
							description: '',
						});
						handleReset();
						notify('success', 'User updated successfully');
					});
				resolve();
			}, 1000);
			return () => clearTimeout(timeOut);
		});
	};

	if (isLoading) {
		return (
			<>
				<DashboardHeading title="Update user" desc="Update user to system"></DashboardHeading>
				<div className="flex justify-center">
					<LoadingSpinner size="60px" />
				</div>
			</>
		);
	}
	console.log(file);
	return (
		<div>
			<DashboardHeading title="Update user" desc="Update user to system"></DashboardHeading>
			<form autoComplete="off" onSubmit={handleSubmit(updateUserHandler)}>
				<div className="form-layout mx-auto !flex w-[800px]">
					<ImageUpload
						name="avatar"
						control={control}
						image={image}
						handleSelectImage={handleSelectImage}
						handleDeleteImage={handleDeleteImage}
					>
						<Progress progress={progress}></Progress>
					</ImageUpload>
				</div>
				<div className="form-layout">
					<Field>
						<Label>Fullname</Label>
						<Input name="fullname" placeholder="Enter your fullname" control={control}></Input>
					</Field>
					<Field>
						<Label>Username</Label>
						<Input name="username" placeholder="Enter your username" control={control}></Input>
					</Field>
				</div>
				<div className="!flex w-full form-layout">
					<Field className="w-full">
						<Label>Email</Label>
						<Input
							name="email"
							placeholder="Enter your email"
							control={control}
							type="email"
						></Input>
					</Field>
				</div>
				<div className="form-layout">
					<Field>
						<Label>Status</Label>
						<FieldCheckboxs>
							{Object.keys(userStatus).map((item) => {
								return (
									<Radio
										key={item}
										name="status"
										control={control}
										checked={+watchStatus === userStatus[item]}
										value={+userStatus[item]}
									>
										{item}
									</Radio>
								);
							})}
						</FieldCheckboxs>
					</Field>
					<Field>
						<Label>Role</Label>
						<FieldCheckboxs>
							{Object.keys(roles).map((item) => {
								return (
									<Radio
										key={item}
										name="role"
										control={control}
										checked={+watchRole === roles[item]}
										value={+roles[item]}
									>
										{item}
									</Radio>
								);
							})}
						</FieldCheckboxs>
					</Field>
				</div>
				<div className="mb-10">
					<Field>
						<Label>Description</Label>
						<Textarea name="description" control={control} />
					</Field>
				</div>
				<Button type="submit" isLoading={isSubmitting} isDisabled={isSubmitting}>
					Update user
				</Button>
			</form>
		</div>
	);
};

export default UserUpdate;
