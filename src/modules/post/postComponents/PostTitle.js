import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const PostTitleStyled = styled.h3`
	font-weight: 600;
	line-height: 1.5;
	a {
		display: block;
	}
	${(props) =>
		props.size === 'small' &&
		css`
			font-size: 14px;
		`};
	${(props) =>
		props.size === 'normal' &&
		css`
			font-size: 18px;
		`}
	${(props) =>
		props.size === 'large' &&
		css`
			font-size: 25px;
		`}
`;

const PostTitle = ({ className, children, size = 'normal', to = '/' }) => {
	return (
		<PostTitleStyled className={className} size={size}>
			<Link to={to}>{children}</Link>
		</PostTitleStyled>
	);
};

export default PostTitle;
