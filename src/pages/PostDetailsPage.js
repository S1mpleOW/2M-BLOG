import Heading from 'components/layout/Heading';
import Layout from 'components/layout/Layout';
import { LoadingSpinner } from 'components/loading';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'firebaseSrc/firebase-config';
import PostCategory from 'modules/post/postComponents/PostCategory';
import PostImage from 'modules/post/postComponents/PostImage';
import PostMeta from 'modules/post/postComponents/PostMeta';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import parse from 'html-react-parser';
import PostAuthor from 'modules/post/postComponents/PostAuthor';
import { PostRelative } from 'modules/post';
import NotFoundPage from './NotFoundPage';

const PostDetailsPageStyles = styled.div`
	padding-bottom: 50px;
	background-color: azure;
	.post {
		&-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 40px;
			margin: 40px 0;
		}
		&-feature {
			width: 100%;
			max-width: 640px;
			height: 466px;
			border-radius: 20px;
		}
		&-heading {
			font-weight: bold;
			font-size: 36px;
			margin-bottom: 16px;
		}
		&-info {
			flex: 1;
		}
		&-content {
			margin: 50px auto;
		}
	}
	.author {
		margin-top: 40px;
		display: flex;
		border-radius: 20px;
		background-color: ${(props) => props.theme.grayF3};
		&-image {
			width: 200px;
			height: 200px;
			flex-shrink: 0;
			border-radius: inherit;
		}
		&-image img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			border-radius: inherit;
		}
		&-content {
			flex: 1;
			padding: 20px;
			.ql-editor {
				line-height: unset;
				height: unset;
				outline: unset;
				overflow-y: unset;
				padding: unset;
				tab-size: unset;
				-moz-tab-size: unset;
				text-align: unset;
				white-space: pre-wrap;
				word-wrap: break-word;
			}
		}
		&-name {
			font-weight: bold;
			margin-bottom: 20px;
			font-size: 20px;
		}
		&-desc {
			font-size: 16px;
			line-height: 2;
		}
	}
`;

const PostDetailsPage = () => {
	const { slug } = useParams();
	const [post, setPost] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	console.log(slug);
	useEffect(() => {
		document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}, [slug]);
	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				const colRef = collection(db, 'posts');
				const docQuery = query(colRef, where('slug', '==', slug));
				const querySnapshot = await getDocs(docQuery);
				querySnapshot.forEach((doc) => {
					setPost({
						...doc.data(),
						id: doc.id,
					});
				});
			} catch (err) {
				console.log(err.message);
			} finally {
				setIsLoading(false);
			}
		})();
	}, [slug]);

	if (!post?.title && !isLoading) {
		return <NotFoundPage />;
	}

	if (isLoading) {
		return (
			<div className="flex justify-center items-center w-full mx-auto pt-10 min-h-[100px]">
				<LoadingSpinner size="60px" />
			</div>
		);
	}

	return (
		<PostDetailsPageStyles>
			<Layout>
				<div className="container">
					<div className="post-header">
						<PostImage src={post?.image || ''} className="post-feature"></PostImage>
						<div className="post-info">
							<PostCategory className="mb-6">{post?.category.name || ''}</PostCategory>
							<h1 className="post-heading">{post?.title || ''}</h1>
							<PostMeta
								date={new Date(post?.createdAt?.seconds * 1000).toLocaleDateString('vi-VI')}
								authorName={post?.user.name || ''}
							></PostMeta>
						</div>
					</div>
					<div className="post-content">
						<div className="entry-content ql-editor">
							{parse(
								post?.content || '<p className="text-lg text-center uppercase">Is uploading</p>'
							)}
							<PostAuthor authorId={post?.user.id}></PostAuthor>
						</div>
					</div>

					<PostRelative
						authorId={post?.user.id}
						categoryId={post?.category.id}
						postRecentId={post?.id}
					></PostRelative>
				</div>
			</Layout>
		</PostDetailsPageStyles>
	);
};

export default PostDetailsPage;
