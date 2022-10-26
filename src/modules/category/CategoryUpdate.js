import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'components/button';
import { Radio } from 'components/checkbox';
import { Field, FieldCheckboxs } from 'components/field';
import { Input } from 'components/input';
import { Label } from 'components/label';
import { LoadingSpinner } from 'components/loading';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseSrc/firebase-config';
import notify from 'helper/notify';
import { DashboardHeading } from 'modules/dashboard';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import slugify from 'slugify';
import { categoryStatus } from 'utils/constants';
import * as yup from 'yup';

const schema = yup.object().shape({
	name: yup.string().required('Name is required'),
	slug: yup.string().required('Slug is required'),
	status: yup
		.number()
		.oneOf([categoryStatus['APPROVED'], categoryStatus['UNAPPROVED']])
		.required('Status is required'),
});

const CategoryUpdate = () => {
	const {
		control,
		formState: { isSubmitting, isValid },
		watch,
		handleSubmit,
		reset,
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			name: '',
			slug: '',
			status: categoryStatus['APPROVED'],
		},
		resolver: yupResolver(schema),
	});
	const watchStatus = watch('status');
	const [isLoading, setIsLoading] = useState(true);
	const [query] = useSearchParams();
	const categoryID = query.get('id');
	useEffect(() => {
		setIsLoading(true);
		try {
			(async () => {
				const docRef = doc(db, 'categories', categoryID);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					const { name, slug, status } = docSnap.data();
					reset({ name, slug, status });
				}
			})();
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoryID]);

	const updateCategoryHandler = async (data) => {
		if (!isValid) return;
		const { slug, name } = data;
		const cloneData = {
			...data,
			updateAt: serverTimestamp(),
			slug: slugify(slug || name, { lower: true }),
		};
		try {
			const categoryRef = doc(db, 'categories', categoryID);
			await updateDoc(categoryRef, cloneData).then(() => {
				notify('success', 'Category updated successfully');
			});
		} catch (err) {
			console.log(err);
			notify('error', 'Error update category');
		} finally {
			reset({
				name: '',
				slug: '',
				status: categoryStatus['APPROVED'],
			});
		}
	};
	return (
		<div>
			<DashboardHeading title="Update category"></DashboardHeading>
			{isLoading ? (
				<div className="flex justify-center">
					<LoadingSpinner size="60px" />
				</div>
			) : (
				<form autoComplete="off" onSubmit={handleSubmit(updateCategoryHandler)}>
					<div className="form-layout">
						<Field>
							<Label htmlFor="name">Name</Label>
							<Input placeholder="Enter your category name" control={control} name="name"></Input>
						</Field>
						<Field>
							<Label htmlFor="slug">Slug</Label>
							<Input placeholder="Enter your slug" control={control} name="slug"></Input>
						</Field>
					</div>
					<div className=" form-layout">
						<Field>
							<Label>Status</Label>
							<FieldCheckboxs>
								<Radio
									name="status"
									control={control}
									checked={+watchStatus === categoryStatus['APPROVED']}
									value={categoryStatus['APPROVED']}
								>
									Approved
								</Radio>
								<Radio
									name="status"
									control={control}
									checked={+watchStatus === categoryStatus['UNAPPROVED']}
									value={categoryStatus['UNAPPROVED']}
								>
									Unapproved
								</Radio>
							</FieldCheckboxs>
						</Field>
					</div>
					<Button type="submit" className="mx-auto" isLoading={isSubmitting}>
						Update category
					</Button>
				</form>
			)}
		</div>
	);
};

export default CategoryUpdate;
