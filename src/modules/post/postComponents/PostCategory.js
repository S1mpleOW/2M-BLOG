import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

const PostCategoryStyled = styled.div`
	display: inline-block;
	padding: ${(props) => props.padding};
	border-radius: 10px;
	color: ${(props) => props.theme.gray6B};
	font-size: 14px;
	font-weight: 600;
	white-space: nowrap;
	margin-bottom: 10px;
	/* overflow: hidden;
	text-overflow: ellipsis;
	max-width: 100px; */
	background-color: white;
	${(props) =>
		props.type === 'primary' &&
		css`
			background-color: ${(props) => props.theme.grayF3}; ;
		`}
`;

const PostCategory = ({ className, type, children, to = '/', padding = '4px 10px' }) => {
	return (
		<PostCategoryStyled padding={padding} type={type} className={className}>
			<NavLink to={to}>{children}</NavLink>
		</PostCategoryStyled>
	);
};

export default PostCategory;
