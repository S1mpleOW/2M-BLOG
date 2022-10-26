import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
const FieldStyled = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 20px;
	align-items: flex-start;
	margin-bottom: 40px;
	&:last-child {
		margin-bottom: 0;
	}
`;

const Field = ({ children, ...props }) => {
	return <FieldStyled {...props}>{children}</FieldStyled>;
};

Field.propsType = {
	children: PropTypes.element || PropTypes.node,
};

export default Field;
