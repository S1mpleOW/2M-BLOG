import React from 'react';
import styled from 'styled-components';
import PropsType from 'prop-types';

const SpinnerStyled = styled.div`
	width: ${(props) => props.size};
	height: ${(props) => props.size};
	border-radius: 100rem;
	border: ${(props) => props.borderSize} solid ${(props) => props.color || 'black'};
	border-top-color: transparent;
	border-bottom-color: transparent;
	display: inline-block;
	animation: spin 1s linear infinite;
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

const LoadingSpinner = ({ size = '30px', borderSize = '4px', color = '', ...props }) => {
	return (
		<SpinnerStyled size={size} borderSize={borderSize} color={color} {...props}></SpinnerStyled>
	);
};

LoadingSpinner.propTypes = {
	size: PropsType.string,
	borderSize: PropsType.string,
};

export default LoadingSpinner;
