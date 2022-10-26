import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'components/button';
import { Radio } from 'components/checkbox';
import { Field, FieldCheckboxs } from 'components/field';
import { Input } from 'components/input';
import { Label } from 'components/label';
import { serverTimestamp } from 'firebase/firestore';
import { addDocument, setDocument } from 'firebaseSrc/firebaseServices/firestore';
import notify from 'helper/notify';
import _ from 'lodash';
import { DashboardHeading } from 'modules/dashboard';
import React from 'react';
import { useForm } from 'react-hook-form';
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

const CategoryAddNew = () => {
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

	const addCategoryHandler = async (data) => {
		if (!isValid) return;
		const { slug, name } = data;
		const cloneData = {
			...data,
			name: _.upperFirst(name),
			createdAt: serverTimestamp(),
			slug: slugify(slug || name, { lower: true }),
		};
		try {
			await addDocument('categories', cloneData).then(async (data) => {
				if (data?.id) {
					await setDocument('categories', data?.id, {
						...cloneData,
						id: data.id,
					}).then(() => {
						notify('success', 'Category added successfully');
					});
				}
			});
		} catch (err) {
			console.log(err);
			notify('error', 'Error adding category');
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
			<DashboardHeading title="New category" desc="Add new category"></DashboardHeading>
			<form autoComplete="off" onSubmit={handleSubmit(addCategoryHandler)}>
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
					Add new category
				</Button>
			</form>
		</div>
	);
};

export default CategoryAddNew;
