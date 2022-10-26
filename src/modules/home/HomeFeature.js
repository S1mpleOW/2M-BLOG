import { Heading } from 'components/layout';
import { LoadingSpinner } from 'components/loading';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from 'firebaseSrc/firebase-config';
import { PostFeatureItem } from 'modules/post';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
const HomeFeatureStyles = styled.div`
	padding-top: 60px;
`;

const HomeFeature = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		const colRef = collection(db, 'posts');
		const q = query(colRef, where('hot', '==', true), where('status', '==', 1));
		onSnapshot(q, (snapshot) => {
			const data = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			console.log(data);
			setPosts(() => {
				return data
					.sort((a, b) => (a.createdAt.seconds - b.createdAt.seconds < 0 ? true : false))
					.slice(0, 3);
			});
			setLoading(false);
		});
	}, []);
	return (
		<HomeFeatureStyles className="home-block">
			<div className="container">
				<Heading>Feature</Heading>
				{loading && (
					<div className="flex items-center justify-center w-full">
						<LoadingSpinner />
					</div>
				)}
				<div className="grid-layout">
					{posts &&
						!loading &&
						posts.map((post) => <PostFeatureItem key={post.id} data={post}></PostFeatureItem>)}
				</div>
			</div>
		</HomeFeatureStyles>
	);
};

export default HomeFeature;
