import { Pagination } from 'components/pagination';
import { Table } from 'components/table';
import { collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseSrc/firebase-config';
import { DashboardHeading } from 'modules/dashboard';
import React from 'react';
import useFirebaseManage from 'hooks/useFirebaseManage';
import { Button } from 'components/button';
import { InputSearch } from 'components/input';
import { debounce } from 'lodash';
import PostTable from './postComponents/PostTable';
import Swal from 'sweetalert2';
import { postStatus } from 'utils/constants';
import notify from 'helper/notify';

const colRef = collection(db, 'posts');

const PostManage = () => {
	const {
		handleFetchData: handleFetchPosts,
		data: posts,
		total,
		isEmpty,
		isLoading,
		setFilter,
		filter,
	} = useFirebaseManage(colRef);

	const handleDeletePost = (id) => {
		try {
			Swal.fire({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				icon: 'error',
				showCancelButton: true,
				confirmButtonColor: '#28a745',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!',
			}).then(async (result) => {
				if (result.isConfirmed) {
					Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
					const docRef = doc(db, 'posts', id);
					await updateDoc(docRef, {
						status: postStatus['REJECTED'],
						updatedAt: serverTimestamp(),
					}).then(() => {
						notify('success', 'User has been deleted');
					});
				}
			});
		} catch (error) {
			notify('error', error.message);
		}
	};
	console.log(isEmpty);
	return (
		<div>
			<DashboardHeading title="Posts" desc="Manage all posts"></DashboardHeading>
			<div className="flex justify-end mb-10">
				<InputSearch
					value={filter}
					onChange={debounce((e) => {
						setFilter(e.target.value);
					}, 500)}
				></InputSearch>
			</div>
			<PostTable
				isLoading={isLoading}
				posts={posts}
				handleDelete={handleDeletePost}
				isEmpty={isEmpty}
			></PostTable>
			{total > posts.length && !isEmpty && !isLoading && (
				<div className="flex justify-center mt-5">
					<Button onClick={handleFetchPosts} width="200px">
						Load more
					</Button>
				</div>
			)}
		</div>
	);
};

export default PostManage;
