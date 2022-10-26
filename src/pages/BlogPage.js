import { Heading, Layout } from 'components/layout';
import { collection, getDocs } from 'firebase/firestore';
import { db } from 'firebaseSrc/firebase-config';
import React, { useEffect, useState } from 'react';
import { PostItem } from 'modules/post';
import { LoadingSpinner } from 'components/loading';

const BlogPage = () => {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const colRef = collection(db, 'posts');
				const snapshot = await getDocs(colRef);
				const results = [];
				snapshot.forEach((doc) => {
					results.push({
						...doc.data(),
						id: doc.id,
					});
				});
				setPosts(results);
			} catch (err) {
				console.log(err.message);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);
	if (isLoading) {
		return (
			<Layout>
				<div className="container">
					<div className="flex justify-center">
						<LoadingSpinner size="60px"></LoadingSpinner>
					</div>
				</div>
			</Layout>
		);
	}
	if (posts?.length <= 0)
		return (
			<Layout>
				<div className="container">
					<Heading className="block">All post</Heading>
					<div className="grid-layout grid-layout--primary">Is updating post</div>
				</div>
			</Layout>
		);
	return (
		<Layout>
			<div className="container">
				<Heading>All post</Heading>
				<div className="grid-layout grid-layout--primary">
					{posts?.length > 0 &&
						posts?.map((post) => <PostItem key={post.id} post={post}></PostItem>)}
				</div>
			</div>
		</Layout>
	);
};

export default BlogPage;
