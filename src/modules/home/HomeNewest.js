import { Heading } from 'components/layout';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from 'firebaseSrc/firebase-config';
import { PostNewestItem, PostNewestLarge } from 'modules/post';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const HomeNewestStyles = styled.div`
	.layout {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		grid-gap: 40px;
		margin-bottom: 64px;
		align-items: start;
	}
	.sidebar {
		padding: 28px 20px;
		background-color: #f3edff;
		border-radius: 16px;
	}
`;

const HomeNewest = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	console.log(posts);

	useEffect(() => {
		setLoading(true);
		const colRef = collection(db, 'posts');
		onSnapshot(colRef, (snapshot) => {
			const data = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			console.log(data);
			setPosts(() => {
				return data.sort((a, b) => (a.createdAt.seconds - b.createdAt.seconds < 0 ? true : false));
			});
			setLoading(false);
		});
	}, []);
	return (
		<HomeNewestStyles className="home-block">
			<div className="container">
				<Heading>Newest update</Heading>
				<div className="layout">
					<PostNewestLarge data={posts[0]}></PostNewestLarge>
					<div className="sidebar">
						{!loading &&
							posts &&
							posts
								.slice(1, 4)
								.map((post) => <PostNewestItem key={post.id} data={post}></PostNewestItem>)}
					</div>
				</div>
				{/* <div className="grid-layout grid-layout--primary">
					<PostItem></PostItem>
					<PostItem></PostItem>
					<PostItem></PostItem>
					<PostItem></PostItem>
				</div> */}
			</div>
		</HomeNewestStyles>
	);
};

export default HomeNewest;
