import { LoadingSpinner } from 'components/loading';
import { ManageTable, Table } from 'components/table';
import React from 'react';

const PostTable = ({ posts, isLoading, handleDelete = () => {}, isEmpty }) => {
	return (
		<Table>
			<thead>
				<tr>
					<th>Id</th>
					<th>Post name</th>
					<th>Category</th>
					<th>Author</th>
					<th>Status</th>
					<th>Actions</th>
				</tr>
			</thead>
			{isLoading ? (
				<tbody>
					<tr>
						<td colSpan="10">
							<LoadingSpinner
								size="60px"
								className="relative top-0 -translate-x-1/2 left-1/2"
							></LoadingSpinner>
						</td>
					</tr>
				</tbody>
			) : isEmpty ? (
				<tbody>
					<tr>
						<td colSpan="10">
							<div className="text-center text-gray-500">No data</div>
						</td>
					</tr>
				</tbody>
			) : (
				<ManageTable
					type="posts"
					isLoading={isLoading}
					items={posts}
					handleDelete={handleDelete}
				></ManageTable>
			)}
		</Table>
	);
};

export default PostTable;
