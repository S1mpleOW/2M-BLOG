import { LoadingSpinner } from 'components/loading';
import { ManageTable, Table } from 'components/table';

const UsersTable = ({ isLoading, users, handleDelete = () => {}, isEmpty }) => {
	return (
		<Table>
			<thead>
				<tr>
					<td>ID</td>
					<td>Name</td>
					<td>Email</td>
					<td>Created at</td>
					<td>Status</td>
					<td>Role</td>
					<td>Actions</td>
				</tr>
			</thead>
			{isLoading || isEmpty ? (
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
			) : (
				<ManageTable
					type="users"
					isLoading={isLoading}
					items={users}
					handleDelete={handleDelete}
				></ManageTable>
			)}
		</Table>
	);
};

export default UsersTable;
