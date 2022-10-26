import { LoadingSpinner } from 'components/loading';
import { ManageTable, Table } from 'components/table';
import React from 'react';

const CategoryTable = ({ categories, isLoading, handleDelete = () => {}, isEmpty }) => {
	return (
		<Table>
			<thead>
				<tr>
					<td>ID</td>
					<td>Name</td>
					<td>Slug</td>
					<td>Status</td>
					<td>Actions</td>
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
					isLoading={isLoading}
					items={categories}
					handleDelete={handleDelete}
				></ManageTable>
			)}
		</Table>
	);
};

export default CategoryTable;
