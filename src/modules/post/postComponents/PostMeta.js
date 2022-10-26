import React from 'react';
import styled from 'styled-components';

const PostMetaStyed = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	font-size: 14px;
	font-weight: 600;
	margin-left: auto;
	color: inherit;
	.post-dot {
		display: inline-block;
		width: 4px;
		height: 4px;
		background-color: currentColor;
		border-radius: 100rem;
	}
`;

const PostMeta = ({ date = 'Mar 23', authorName = 'Andiez Le', className = '' }) => {
	return (
		<PostMetaStyed className={`${className}`}>
			<span className="post-time">{date}</span>
			<span className="post-dot"></span>
			<span className="post-author">{authorName}</span>
		</PostMetaStyed>
	);
};

export default PostMeta;
