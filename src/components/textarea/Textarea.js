import React from 'react';
import styled from 'styled-components';
import { useController } from 'react-hook-form';

const TextareaStyles = styled.div`
	position: relative;
	width: 100%;
	textarea {
		width: 100%;
		padding: 16px 20px;
		background-color: transparent;
		border: 1px solid ${(props) => props.theme.grayf1};
		border-radius: 8px;
		color: ${(props) => props.theme.black};
		font-size: 16px;
		resize: none;
		min-height: 200px;
		transition: all 0.2s linear;
	}
	textarea::-webkit-input-placeholder {
		color: #b2b3bd;
	}
	textarea::-moz-input-placeholder {
		color: #b2b3bd;
	}
`;

const Textarea = ({ name = '', type = 'text', children, control, ...props }) => {
	const { field } = useController({
		control,
		name,
		defaultValue: '',
	});
	return (
		<TextareaStyles>
			<textarea id={name} type={type} {...field} {...props} />
		</TextareaStyles>
	);
};

export default Textarea;
