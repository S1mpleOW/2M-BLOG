import React from 'react';
import styled from 'styled-components';
import { formatDate } from 'utils/constants';
import PostCategory from './postComponents/PostCategory';
import PostImage from './postComponents/PostImage';
import PostMeta from './postComponents/PostMeta';
import PostTitle from './postComponents/PostTitle';
const PostNewestItemStyles = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
	margin-bottom: 28px;
	padding-bottom: 28px;
	border-bottom: 1px solid #ccc;
	&:last-child {
		padding-bottom: 0;
		margin-bottom: 0;
		border-bottom: 0;
	}
	.post {
		&-image {
			display: block;
			flex-shrink: 0;
			width: 180px;
			height: 130px;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				border-radius: 12px;
			}
		}
		&-title {
			margin-bottom: 8px;
		}
	}
`;
const PostNewestItem = ({ data }) => {
	return (
		<PostNewestItemStyles>
			<PostImage src={data?.image} alt="unsplash" className="post-image" />
			<div className="post-content">
				<PostCategory className="post-category">{data?.category?.name}</PostCategory>
				<PostTitle className="post-title" to={`/blogs/${data?.slug}`}>
					{data?.title}
				</PostTitle>
				<PostMeta date={formatDate(data)} authorName={data?.user?.name || ''}></PostMeta>
			</div>
		</PostNewestItemStyles>
	);
};

export default PostNewestItem;
