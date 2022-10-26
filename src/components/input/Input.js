import React from 'react';
import { useController } from 'react-hook-form';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputStyled = styled.div`
	position: relative;
	width: 100%;
	.input {
		width: 100%;
		padding: ${(props) => (props.hasIcon ? '20px 60px 20px 20px' : '20px')};
		background-color: ${(props) => props.theme.grayLight};
		outline: none;
		border-radius: 10px;
		border: 1px solid transparent;
		transition: all 0.3s ease-in-out;
	}
	.input::-webkit-input-placeholder {
		color: ${(props) => props.theme.placeHolder};
	}
	.input::-moz-input-placeholder {
		color: ${(props) => props.theme.placeHolder};
	}
	.input:focus {
		border: 1px solid ${(props) => props.theme.primary};
		background-color: white;
	}
	.icon {
		position: absolute;
		right: 20px;
		top: 50%;
		transform: translateY(-50%);
		cursor: pointer;
	}
`;

const Input = ({
	name = '',
	control,
	id,
	type = 'text',
	placeholder = '',
	hasIcon = true,
	children,
	...props
}) => {
	const {
		field,
		fieldState: { error },
	} = useController({
		name,
		control,
		rules: { required: true },
		defaultValue: '',
	});
	return (
		<InputStyled hasIcon={hasIcon}>
			<input
				className="input"
				type={type}
				placeholder={placeholder}
				id={id ? id : name}
				{...props}
				{...field}
			/>
			{children ? <div className="icon">{children}</div> : null}
			<p className="error-message">{error?.message || ''}</p>
		</InputStyled>
	);
};

Input.propsType = {
	name: PropTypes.string,
	control: PropTypes.object.isRequired,
	type: PropTypes.string,
	id: PropTypes.string,
	placeholder: PropTypes.string,
	hasIcon: PropTypes.bool,
	children: PropTypes.element || PropTypes.node,
};

export default Input;
