import { Button } from 'components/button';
import { InputSearch } from 'components/input';
import { collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseSrc/firebase-config';
import notify from 'helper/notify';
import useFirebaseManage from 'hooks/useFirebaseManage';
import { debounce } from 'lodash';
import { DashboardHeading } from 'modules/dashboard';
import Swal from 'sweetalert2';
import { userStatus } from 'utils/constants';
import UsersTable from './UsersTable';

const colRef = collection(db, 'users');

const UsersManage = () => {
	const {
		handleFetchData: handleFetchUsers,
		data: users,
		total,
		isEmpty,
		isLoading,
		setFilter,
		filter,
	} = useFirebaseManage(colRef);
	const handleDeleteUser = (id) => {
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
					const docRef = doc(db, 'users', id);
					await updateDoc(docRef, {
						status: userStatus['DELETED'],
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

	return (
		<div>
			<DashboardHeading title="Users" desc="Manage your users"></DashboardHeading>
			<div className="flex items-center justify-between mb-10">
				<Button to="/manage/add-user" effect height="52px">
					Add new user
				</Button>
				<InputSearch
					value={filter}
					onChange={debounce((e) => {
						setFilter(e.target.value);
					}, 500)}
				></InputSearch>
			</div>
			<UsersTable
				users={users}
				isLoading={isLoading}
				handleDelete={handleDeleteUser}
				isEmpty={isEmpty}
			></UsersTable>
			{total > users.length && !isEmpty && !isLoading && (
				<div className="flex justify-center mt-5">
					<Button onClick={handleFetchUsers} width="200px">
						Load more
					</Button>
				</div>
			)}
		</div>
	);
};

export default UsersManage;
