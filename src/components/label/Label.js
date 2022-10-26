import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
const LabelStyled = styled.label`
	color: ${(props) => props.theme.grayDark};
	font-weight: 600;
	cursor: pointer;
`;

const Label = ({ htmlFor, children, ...props }) => {
	return (
		<LabelStyled htmlFor={htmlFor} {...props}>
			{children}
		</LabelStyled>
	);
};

Label.propsType = {
	htmlFor: PropTypes.string,
	children: PropTypes.element || PropTypes.node,
};

export default Label;
