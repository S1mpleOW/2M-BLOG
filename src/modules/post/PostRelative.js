import { Heading } from 'components/layout';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from 'firebaseSrc/firebase-config';
import { useEffect, useState } from 'react';
import PostItem from './PostItem';

const PostRelative = ({ authorId = '', categoryId = '', postRecentId = '' }) => {
	const [postsRelative, setPostsRelative] = useState([]);
	console.log(postRecentId);
	useEffect(() => {
		const colRef = collection(db, 'posts');
		onSnapshot(colRef, (snapshot) => {
			const results = [];
			snapshot.forEach((doc) => {
				if (doc.exists() && doc.id !== postRecentId) {
					if (doc.data().userId === authorId || doc.data().categoryId === categoryId) {
						results.push({
							id: doc.id,
							...doc.data(),
						});
					}
				}
			});
			setPostsRelative(results);
		});
	}, [authorId, categoryId, postRecentId]);

	console.log(postsRelative);
	if (postsRelative?.length <= 0) {
		return (
			<div className="post-related">
				<Heading>Relative Posts</Heading>
				<div className="grid-layout grid-layout--primary">Is updating post</div>
			</div>
		);
	}
	return (
		<div className="post-related">
			<Heading>Relative Posts</Heading>
			<div className="grid-layout grid-layout--primary">
				{postsRelative?.length > 0 &&
					postsRelative?.map((post) => <PostItem key={post.id} post={post} />)}
			</div>
		</div>
	);
};

export default PostRelative;
