import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const PostImageStyled = styled.div`
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: inherit;
	}
	a {
		display: inline-block;
		width: 100%;
		height: 100%;
	}
`;

const PostImage = ({ src = '', alt = '', className = '', to }) => {
	return (
		<PostImageStyled className={className}>
			{to ? (
				<NavLink to={to}>
					<img src={src} alt={alt} loading="lazy" />
				</NavLink>
			) : (
				<img src={src} alt={alt} loading="lazy" />
			)}
		</PostImageStyled>
	);
};

export default PostImage;
