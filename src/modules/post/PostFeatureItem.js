import { db } from 'firebaseSrc/firebase-config';
import { doc, getDoc } from 'firebase/firestore';

import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import PostImage from './postComponents/PostImage';
import PostCategory from './postComponents/PostCategory';
import PostMeta from './postComponents/PostMeta';
import PostTitle from './postComponents/PostTitle';
import { formatDate } from 'utils/constants';

const PostFeatureItemStyles = styled.div`
	width: 100%;
	border-radius: 16px;
	position: relative;
	height: 169px;
	.post {
		&-image {
			width: 100%;
			height: 100%;
			border-radius: 16px;
		}
		&-overlay {
			position: absolute;
			inset: 0;
			border-radius: 16px;
			background: linear-gradient(
				179.77deg,
				#6b6b6b 36.45%,
				rgba(163, 163, 163, 0.622265) 63.98%,
				rgba(255, 255, 255, 0) 99.8%
			);
			mix-blend-mode: multiply;
			opacity: 0.6;
		}
		&-category {
			margin-bottom: unset;
		}
		&-content {
			position: absolute;
			inset: 0;
			z-index: 10;
			padding: 20px;
			color: white;
		}
		&-top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 16px;
		}
		.post-title {
			color: white;
		}
	}
	@media screen and (min-width: 1024px) {
		height: 272px;
	}
`;
const PostFeatureItem = ({ data }) => {
	const [category, setCategory] = useState(null);
	const [author, setAuthor] = useState(null);

	useEffect(() => {
		(async () => {
			const docRef = doc(db, 'categories', data?.category.id);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setCategory(docSnap.data());
			}
		})();
	}, [data?.category.id]);

	useEffect(() => {
		(async () => {
			const docRef = doc(db, 'users', data?.user.id);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setAuthor(docSnap.data());
			}
		})();
	}, [data?.user.id]);
	if (!data.id) return;
	return (
		<PostFeatureItemStyles>
			<PostImage src={data.image} alt="unsplash" className="post-image" />
			<div className="post-overlay"></div>
			<div className="post-content">
				<div className="post-top">
					<PostCategory type="primary" className="capitalize post-category">
						{category?.name ? category?.name : 'uncategorized'}
					</PostCategory>
					<PostMeta
						date={formatDate(data)}
						authorName={author ? author.displayName : ''}
					></PostMeta>
				</div>
				<PostTitle size="large" className="post-title" to={`/blogs/${data?.slug}`}>
					{data?.title}
				</PostTitle>
			</div>
		</PostFeatureItemStyles>
	);
};

export default PostFeatureItem;
