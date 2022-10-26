import { doc, getDoc } from 'firebase/firestore';
import { db } from 'firebaseSrc/firebase-config';
import React, { useEffect, useState } from 'react';

const PostAuthor = ({ authorId }) => {
	const [author, setAuthor] = useState({});
	console.log(author);
	useEffect(() => {
		(async () => {
			if (authorId) {
				const docRef = doc(db, 'users', authorId);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					setAuthor(docSnap.data());
				}
			}
		})();
	}, [authorId]);

	return (
		<div className="author">
			<div className="author-image">
				<img src={author?.avatar || ''} alt="avatar" />
			</div>
			<div className="author-content">
				<h3 className="author-name">{author?.displayName}</h3>
				<p className="author-desc">{author?.description || 'No description'}</p>
			</div>
		</div>
	);
};

export default PostAuthor;
