import { EyeInvisibleIcon, EyeVisibleIcon } from 'icon';
import React from 'react';
import Input from './Input';

const InputPasswordToggle = ({ control, ...props }) => {
	const [showPassword, setShowPassword] = React.useState(false);
	if (!control) return null;
	return (
		<React.Fragment>
			<Input
				type={showPassword ? 'text' : 'password'}
				name="password"
				id="password"
				className="input"
				placeholder="Enter your password"
				control={control}
				{...props}
			>
				{!showPassword ? (
					<EyeInvisibleIcon onClick={() => setShowPassword(!showPassword)} />
				) : (
					<EyeVisibleIcon onClick={() => setShowPassword(!showPassword)} />
				)}
			</Input>
		</React.Fragment>
	);
};

export default InputPasswordToggle;
