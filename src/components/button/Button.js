import { LoadingSpinner } from 'components/loading';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const ButtonStyled = styled.button`
	cursor: pointer;
	line-height: 1;
	color: white;
	background: linear-gradient(
		107.61deg,
		${(props) => props.theme.primary} 15.59%,
		${(props) => props.theme.secondary} 87.25%
	);
	border: none;
	border-radius: 10px;
	padding: 0 25px;
	font-size: 18px;
	font-weight: 600;
	width: ${(props) => props.width || '100%'};
	display: flex;
	justify-content: center;
	align-items: center;
	height: ${(props) => props.height};
	transition: all 0.3s ease-in-out;
	${(props) =>
		props.effect
			? `
				position: relative;
				background: transparent;
				isolation: isolate;
				border-radius: 4px;
				border: 1px solid ${props.theme.primary};
				outline: none;
				color: ${props.theme.primary};
				&:after {
					content: "";
					height: 100%;
					width: 0;
					position: absolute;
					background: linear-gradient(107.61deg,${props.theme.primary} 15.59%, ${props.theme.secondary} 87.25%);
					top: 0;
					left: 0;
					z-index: -1;
					transition: width 0.25s ease-in;
				}
				&:hover {
					color: white;
				}
				:hover:after {
					width: 100%;
				}
			`
			: ''}
	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
	&:hover {
		opacity: 0.8;
	}
	&:active {
		transform: scale(0.95);
	}
`;

const Button = ({
	type = 'button',
	onClick = () => {},
	height = '66px',
	isLoading = false,
	effect,
	to,
	children,
	...props
}) => {
	const child = isLoading ? <LoadingSpinner /> : children;
	if (to && typeof to === 'string') {
		return (
			<Link to={to} style={{ display: 'inline-block' }}>
				<ButtonStyled type={type} height={height} disabled={isLoading} effect={effect} {...props}>
					{child}
				</ButtonStyled>
			</Link>
		);
	}
	return (
		<ButtonStyled type={type} onClick={onClick} height={height} disabled={isLoading} {...props}>
			{child}
		</ButtonStyled>
	);
};

Button.propsType = {
	type: PropTypes.oneOf(['button', 'submit']).isRequired,
	onClick: PropTypes.func.isRequired,
	height: PropTypes.string,
	isLoading: PropTypes.bool,
	children: PropTypes.element || PropTypes.node,
	effect: PropTypes.bool,
};

export default Button;
