import React from 'react';
import styled from 'styled-components';
import { formatDate } from 'utils/constants';
import PostCategory from './postComponents/PostCategory';
import PostImage from './postComponents/PostImage';
import PostMeta from './postComponents/PostMeta';
import PostTitle from './postComponents/PostTitle';
const PostItemStyles = styled.div`
	display: flex;
	flex-direction: column;
	padding: 15px 10px;
	background: rgba(187, 134, 252, 0.3);
	border-radius: 15px;
	.post {
		&-image {
			height: 202px;
			margin-bottom: 20px;
			display: block;
			width: 100%;
			flex-shrink: 0;
		}
		&-category {
			margin-bottom: 10px;
			width: fit-content;
		}

		&-title {
			margin-bottom: 8px;
		}
		&-meta {
			margin-top: auto;
		}
	}
`;

const PostItem = ({ post }) => {
	return (
		<PostItemStyles>
			<PostImage
				src={post?.image || 'https://source.unsplash.com/random'}
				alt="image"
				className="post-image"
			/>
			<div className="flex flex-col w-full h-full">
				<div className="flex flex-col flex-shrink-0">
					<PostCategory type="primary" className="post-category ">
						{post?.category?.name || 'S1mple'}
					</PostCategory>
					<PostTitle to={`/blogs/${post?.slug}`} className="post-title">
						{post?.title}
					</PostTitle>
				</div>
				<PostMeta
					date={formatDate(post)}
					authorName={post?.user.name || 'Anonymous'}
					className="post-meta"
				></PostMeta>
			</div>
		</PostItemStyles>
	);
};

export default PostItem;
