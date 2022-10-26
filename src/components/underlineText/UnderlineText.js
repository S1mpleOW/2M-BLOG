import React from 'react';
import styled from 'styled-components';

const UnderlineTextStyled = styled.span`
	position: relative;
	&:after {
		content: '';
		position: absolute;
		bottom: -5px;
		left: 0;
		width: 0;
		opacity: 0;
		visibility: hidden;
		height: 3px;
		background: linear-gradient(
			155deg,
			${(props) => props.theme.primary} 6.67%,
			${(props) => props.theme.secondary} 84.1%
		);
		transition: all 0.3s ease-in;
	}
	&:hover:after {
		width: 100%;
		opacity: 1;
		visibility: visible;
	}
`;

const UnderlineText = ({ children }) => {
	return <UnderlineTextStyled>{children}</UnderlineTextStyled>;
};

export default UnderlineText;
