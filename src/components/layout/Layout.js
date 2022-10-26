import React from 'react';
import Header from './Header';
import styled from 'styled-components';

const LayoutStyled = styled.div`
	background-color: azure;
`;

const Layout = ({ children }) => {
	return (
		<LayoutStyled>
			<Header></Header>
			{children}
		</LayoutStyled>
	);
};

export default Layout;
