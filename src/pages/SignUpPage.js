import { Input, InputPasswordToggle } from 'components/input';
import { Label } from 'components/label';
import { useForm } from 'react-hook-form';
import React from 'react';
import { Field } from 'components/field';
import { Button } from 'components/button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerUsingEmailAndPassword } from 'firebaseSrc/firebaseMethod';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthenPage from './AuthenPage';
import UnderlineText from 'components/underlineText/UnderlineText';
import { roles, userStatus } from 'utils/constants';

const schema = yup.object().shape({
	fullName: yup.string().required('Fullname is required'),
	email: yup.string().email('Email is invalid').required('Email is required'),
	password: yup
		.string()
		.min(8, 'Password must be at least 8 characters long')
		.required('Password is required'),
});

const SignUpPage = () => {
	const {
		handleSubmit,
		control,
		formState: { errors, isValid, isSubmitting },
		reset,
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(schema),
		defaultValues: {
			fullName: 'Đỗ Quốc Dũng',
			email: 'dungdqch@gmail.com',
			password: '123456123',
		},
	});
	const navigate = useNavigate();
	const onSubmit = (data) => {
		console.log(data);
		if (!isValid) return;
		return new Promise((resolve) => {
			const timeOut = setTimeout(async () => {
				const param = {
					displayName: data.fullName,
					role: roles['USER'],
					status: userStatus['PENDING'],
					avatar: `${process.env.REACT_APP_AVATAR}/${data.fullName}.svg`,
					...data,
				};
				const isRegistered = await registerUsingEmailAndPassword(param);
				if (isRegistered) {
					reset();
					navigate('/');
					// should be use setDoc íntead of addDoc
				}
				resolve();
			}, 1000);
			return () => clearTimeout(timeOut);
		});
	};

	return (
		<AuthenPage errors={errors}>
			<form className="form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
				<Field className="field">
					<Label htmlFor="fullName">Fullname</Label>
					<Input
						type="text"
						name="fullName"
						id="fullName"
						className="input"
						placeholder="Enter your fullname"
						control={control}
					/>
				</Field>
				<Field className="field">
					<Label htmlFor="email">Email</Label>
					<Input
						type="email"
						name="email"
						id="email"
						className="input"
						placeholder="Enter your email"
						control={control}
					/>
				</Field>
				<Field className="field">
					<Label htmlFor="password">Password</Label>
					<InputPasswordToggle control={control}></InputPasswordToggle>
				</Field>
				<div className="have-account">
					Have you had already account?{' '}
					<NavLink to={`/sign-in`}>
						<UnderlineText>Sign in</UnderlineText>
					</NavLink>
				</div>
				<Button
					type="submit"
					style={{
						maxWidth: 300,
						margin: '0 auto',
					}}
					isLoading={isSubmitting}
				>
					Sign up
				</Button>
			</form>
		</AuthenPage>
	);
};

export default SignUpPage;
