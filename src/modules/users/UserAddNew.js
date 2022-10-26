import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'components/button';
import { Radio } from 'components/checkbox';
import { Field, FieldCheckboxs } from 'components/field';
import { ImageUpload, Progress } from 'components/image';
import { Input } from 'components/input';
import { Label } from 'components/label';
import { Textarea } from 'components/textarea';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from 'firebaseSrc/firebase-config';
import { registerUsingEmailAndPassword } from 'firebaseSrc/firebaseMethod';
import useFirebaseImage from 'hooks/useFirebaseImage';
import { DashboardHeading } from 'modules/dashboard';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { roles, userStatus } from 'utils/constants';
import * as yup from 'yup';

const schema = yup.object().shape({
	fullname: yup.string().required('Name is required'),
	username: yup.string().required('Username is required'),
	email: yup.string().email("Email isn't valid").required('Email is required'),
	password: yup.string().required('Password is required'),
	status: yup.number().oneOf(Object.values(userStatus)).required('Status is required'),
	role: yup.number().oneOf(Object.values(roles)).required('Role is required'),
	avatar: yup.string(),
	description: yup.string(),
});

const UserAddNew = () => {
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
			password: '',
			role: roles['USER'],
			status: userStatus['PENDING'],
			description: '',
		},
		resolver: yupResolver(schema),
	});
	const watchStatus = watch('status');
	const watchRole = watch('role');
	const [file, setFile] = useState({});
	const { setImage, setProgress, image, progress, handleUploadImage, handleSelectImage } =
		useFirebaseImage(setFile, getValues, 'users/');
	const handleReset = () => {
		setFile({});
		setImage('');
		setProgress(0);
	};

	const addUserHandler = (data) => {
		if (!isValid) {
			return;
		}
		console.log(data);
		return new Promise((resolve) => {
			const timeOut = setTimeout(async () => {
				const param = { displayName: data.fullname, ...data };
				const idRegistered = await registerUsingEmailAndPassword(param);
				console.log(idRegistered);
				if (idRegistered) {
					if (file.name) {
						await handleUploadImage(file).then(async (image) => {
							const docRef = doc(db, 'users', idRegistered);
							await updateDoc(docRef, { avatar: image }).then(() => {
								handleReset();
							});
							await updateProfile(auth?.currentUser, {
								photoURL: image,
							});
						});
					}
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
				}
				resolve();
			}, 1000);
			return () => clearTimeout(timeOut);
		});
	};
	return (
		<div>
			<DashboardHeading title="New user" desc="Add new user to system"></DashboardHeading>
			<form autoComplete="off" onSubmit={handleSubmit(addUserHandler)}>
				<div className="form-layout mx-auto !flex w-[800px]">
					<ImageUpload
						name="avatar"
						control={control}
						image={image}
						progress={progress}
						handleSelectImage={handleSelectImage}
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
				<div className="form-layout">
					<Field>
						<Label>Email</Label>
						<Input
							name="email"
							placeholder="Enter your email"
							control={control}
							type="email"
						></Input>
					</Field>
					<Field>
						<Label>Password</Label>
						<Input
							name="password"
							placeholder="Enter your password"
							control={control}
							type="password"
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
						<Textarea control={control} name="description" />
					</Field>
				</div>
				<Button type="submit" isLoading={isSubmitting} isDisabled={isSubmitting}>
					Add new user
				</Button>
			</form>
		</div>
	);
};

export default UserAddNew;
