import React from 'react';
import styled from 'styled-components';
import { formatDate } from 'utils/constants';
import PostCategory from './postComponents/PostCategory';
import PostImage from './postComponents/PostImage';
import PostMeta from './postComponents/PostMeta';
import PostTitle from './postComponents/PostTitle';
const PostNewestLargeStyles = styled.div`
	.post {
		&-container {
			background-color: ${(props) => props.theme.grayF3};
			border-bottom-left-radius: 16px;
			border-bottom-right-radius: 16px;
		}
		&-image {
			display: block;
			height: 433px;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				border-top-left-radius: 16px;
				border-top-right-radius: 16px;
			}
		}
	}
`;

const PostNewestLarge = ({ data }) => {
	return (
		<PostNewestLargeStyles>
			<PostImage src={data?.image} alt="unsplash" className="post-image" to="/sign-in" />
			<div className="p-5 post-container">
				<PostCategory type="primary" padding={'4px 0px'} className="pl-0 post-category">
					{data?.category?.name}
				</PostCategory>
				<div className="flex items-center">
					<PostTitle to={`/blogs/${data?.slug}`} size="large" className="post-title">
						{data?.title}
					</PostTitle>
					<PostMeta
						date={formatDate(data)}
						className="ml-auto"
						authorName={data?.user?.name || ''}
					></PostMeta>
				</div>
			</div>
		</PostNewestLargeStyles>
	);
};

export default PostNewestLarge;
