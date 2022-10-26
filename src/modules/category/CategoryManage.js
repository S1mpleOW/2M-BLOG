import { collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from 'firebaseSrc/firebase-config';
import notify from 'helper/notify';

import Swal from 'sweetalert2';
import { DashboardHeading } from 'modules/dashboard';
import { InputSearch } from 'components/input';
import { debounce } from 'lodash';
import { Button } from 'components/button';
import CategoryTable from './CategoryTable';
import useFirebaseManage from 'hooks/useFirebaseManage';

const colRef = collection(db, 'categories');

const CategoryManage = () => {
	const {
		handleFetchData: handleFetchCategory,
		data: categories,
		total,
		isEmpty,
		isLoading,
		setFilter,
		filter,
	} = useFirebaseManage(colRef);

	const handleDeleteCategory = (id) => {
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
					const docRef = doc(db, 'categories', id);
					await deleteDoc(docRef).then(() => {
						notify('success', 'Delete category successfully');
					});
				}
			});
		} catch (error) {
			notify('error', error.message);
		}
	};

	return (
		<>
			<DashboardHeading title="Categories" desc="Manage all categories"></DashboardHeading>
			<div className="flex items-center justify-between mb-10">
				<Button to="/manage/add-category" effect height="52px">
					Add new category
				</Button>
				<InputSearch
					value={filter}
					onChange={debounce((e) => {
						setFilter(e.target.value);
					}, 500)}
				></InputSearch>
			</div>
			<CategoryTable
				categories={categories}
				isLoading={isLoading}
				handleDelete={handleDeleteCategory}
				isEmpty={isEmpty}
			></CategoryTable>
			{total > categories.length && !isEmpty && !isLoading && (
				<div className="flex justify-center mt-5">
					<Button onClick={handleFetchCategory} width="200px">
						Load more
					</Button>
				</div>
			)}
		</>
	);
};

export default CategoryManage;
