import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'components/button';
import { Field } from 'components/field';
import { Input, InputPasswordToggle } from 'components/input';
import { Label } from 'components/label';
import React from 'react';
import { useForm } from 'react-hook-form';
import AuthenPage from './AuthenPage';
import * as yup from 'yup';
import { loginUsingEmailAndPassword } from 'firebaseSrc/firebaseMethod';
import { NavLink, useNavigate } from 'react-router-dom';
import UnderlineText from 'components/underlineText/UnderlineText';
import notify from 'helper/notify';

const schema = yup.object().shape({
	email: yup.string().email('Email is valid').required('Email is required'),
	password: yup
		.string()
		.min(8, 'Password must be at least 8 characters')
		.required('Password is required'),
});

const SignInPage = () => {
	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isValid, errors },
		reset,
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			email: 'dungdqch@gmail.com',
			password: '123456123',
		},
		resolver: yupResolver(schema),
	});
	const navigate = useNavigate();
	const onSubmit = (values) => {
		if (!isValid) return;
		return new Promise((resolve) => {
			const timeOut = setTimeout(async () => {
				const isLoggedIn = await loginUsingEmailAndPassword({ ...values });
				if (isLoggedIn) {
					reset();
					notify('success', 'Login success');
					navigate('/');
				}
				resolve();
			}, 2000);
			return () => clearTimeout(timeOut);
		});
	};
	return (
		<AuthenPage errors={errors}>
			<form className="form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
					{/* {errors && errors.email && <span className="error">{errors.email.message}</span>} */}
				</Field>
				<Field className="field">
					<Label htmlFor="password">Password</Label>
					<InputPasswordToggle control={control}></InputPasswordToggle>
					{/* {errors && errors.password && <span className="error">{errors.password.message}</span>} */}
				</Field>
				<div className="have-account">
					Have you registered account?{' '}
					<NavLink to={`/sign-up`}>
						<UnderlineText>Register</UnderlineText>
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
					Sign in
				</Button>
			</form>
		</AuthenPage>
	);
};

export default SignInPage;
