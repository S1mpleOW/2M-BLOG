import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'components/button';
import { Radio } from 'components/checkbox';
import { Dropdown } from 'components/dropdown';
import { Field } from 'components/field';
import { ImageUpload, Progress } from 'components/image';
import { Input } from 'components/input';
import { Label } from 'components/label';
import { Toggle } from 'components/toggle';
import { DropdownProvider } from 'context/dropdown-context';
import { addDocument } from 'firebaseSrc/firebaseServices/firestore';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { categoryStatus, postStatus } from 'utils/constants';
import { auth, db } from 'firebaseSrc/firebase-config';
import * as yup from 'yup';
import notify from 'helper/notify';
import useFirebaseImage from 'hooks/useFirebaseImage';
import slugify from 'slugify';
import { DashboardHeading } from 'modules/dashboard';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { formats, modules, QuillToolbar } from 'components/editorText';
import ReactQuill from 'react-quill';

const PostAddNewStyles = styled.div``;

const schema = yup.object().shape({
	title: yup.string().required('Title is required'),
	slug: yup.string().required('Slug is required'),
	category: yup.object().required('Category is required'),
	status: yup
		.number()
		.oneOf([postStatus['APPROVED'], postStatus['PENDING'], postStatus['REJECTED']])
		.required('Status is required'),
	image: yup.string().required('Image is required'),
});

const PostAddNews = () => {
	const {
		control,
		watch,
		setValue,
		getValues,
		handleSubmit,
		formState: { isValid, errors, isSubmitting },
		clearErrors,
		reset,
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			title: '',
			slug: '',
			status: postStatus['PENDING'],
			category: '',
			categoryId: '',
			image: '',
			hot: false,
		},
		resolver: yupResolver(schema),
	});
	const watchStatus = watch('status');
	const watchCategory = watch('category');
	const watchHot = watch('hot');
	const [categories, setCategories] = useState([]);
	const [select, setSelect] = useState({
		id: '',
		name: 'Please select an option',
		slug: '',
	});
	const [file, setFile] = useState({});
	const [loading, setLoading] = useState(false);
	const {
		setImage,
		setProgress,
		image,
		progress,
		handleUploadImage,
		handleSelectImage,
		handleDeleteImage,
	} = useFirebaseImage(setFile, getValues);
	const [content, setContent] = useState('');

	useEffect(() => {
		document.title = 'Monkey - Add News';
	}, []);

	useEffect(() => {
		const categoriesRef = collection(db, 'categories');
		const queryCategories = query(categoriesRef, where('status', '==', categoryStatus['APPROVED']));
		onSnapshot(queryCategories, (data) => {
			if (data) {
				setCategories([]);
				let items = [];
				data.forEach((doc) => {
					items.push(doc.data());
				});
				setCategories(items);
			}
		});
	}, []);
	console.log(select);

	useEffect(() => {
		if (watchCategory && categories.length > 0) {
			const selectFind = categories.find((category) => category.id === watchCategory);
			if (selectFind) {
				const category = {
					id: selectFind.id,
					name: selectFind.name,
					slug: selectFind.slug,
				};
				setSelect(category);
				setValue('category', category);
				clearErrors('category');
			}
		} else {
			setSelect({
				id: '',
				name: 'Please select an option',
				slug: '',
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watchCategory, categories]);

	const handleReset = () => {
		setFile({});
		setImage('');
		setProgress(0);
		setContent('');
	};

	const addPostHandler = async (data) => {
		if (!isValid) return;
		console.log(data);
		try {
			setLoading(true);
			const response = await handleUploadImage(file).then(async (image) => {
				const cloneData = {
					...data,
					slug: slugify(data.slug || data.title, { lower: true }),
					status: Number(data.status),
					image,
					user: {
						id: auth.currentUser.uid,
						name: auth.currentUser.displayName,
						avatar: auth.currentUser.photoURL,
					},
					userId: auth.currentUser.uid,
					category: select,
					categoryId: select.id,
					content,
				};
				const response = await addDocument('/posts', cloneData);
				if (response) {
					return true;
				}
				return false;
			});
			if (response) {
				notify('success', 'Post added successfully');
			} else {
				notify('error', 'Error adding post');
			}
			reset({
				title: '',
				slug: '',
				status: postStatus['PENDING'],
				category: {},
				categoryId: '',
				image: '',
				hot: false,
				user: {},
				userId: '',
			});
			handleReset();
		} catch (error) {
			notify('error', 'Error adding post');
		} finally {
			setLoading(false);
		}
	};

	return (
		<PostAddNewStyles>
			<DashboardHeading title="Add new post"></DashboardHeading>
			<form onSubmit={handleSubmit(addPostHandler)}>
				<div className="grid grid-cols-2 mb-10 gap-x-10">
					<Field>
						<Label htmlFor="title">Title</Label>
						<Input control={control} placeholder="Enter your title" name="title"></Input>
					</Field>
					<Field>
						<Label htmlFor="slug">Slug</Label>
						<Input control={control} placeholder="Enter your slug" name="slug"></Input>
					</Field>
				</div>
				<div className="grid grid-cols-1 mb-10 gap-x-10">
					<Field>
						<Label>Category</Label>
						<DropdownProvider>
							<Dropdown>
								<Dropdown.Select placeholder={select?.name}></Dropdown.Select>
								<Dropdown.List>
									{categories &&
										categories.length > 0 &&
										categories.map((category) => {
											return (
												<Dropdown.Option
													key={category?.id}
													slug={category?.slug}
													onClick={() => setValue('category', category?.id)}
												>
													{category?.name?.toUpperCase()}
												</Dropdown.Option>
											);
										})}
								</Dropdown.List>
								<p className="error-message">{errors?.category?.message || ''}</p>
							</Dropdown>
						</DropdownProvider>
					</Field>
				</div>
				<div className="grid grid-cols-2 mb-10 gap-x-10">
					<div className="grid grid-cols-1 grid-rows-2">
						<Field>
							<Label>Status</Label>
							<div className="flex items-center gap-x-5">
								<Radio
									name="status"
									control={control}
									checked={+watchStatus === postStatus['APPROVED']}
									value={+postStatus['APPROVED']}
								>
									Approve
								</Radio>
								<Radio
									name="status"
									control={control}
									checked={+watchStatus === postStatus['PENDING']}
									value={+postStatus['PENDING']}
								>
									Pending
								</Radio>
								<Radio
									name="status"
									control={control}
									checked={+watchStatus === postStatus['REJECTED']}
									value={+postStatus['REJECTED']}
								>
									Reject
								</Radio>
							</div>
						</Field>
						<Field>
							<Label>Feature post</Label>
							<Toggle on={watchHot === true} onClick={() => setValue('hot', !watchHot)}></Toggle>
						</Field>
					</div>
					<Field>
						<Label>Image Upload</Label>
						<ImageUpload
							name="image"
							control={control}
							image={image}
							progress={progress}
							handleSelectImage={handleSelectImage}
							handleDeleteImage={handleDeleteImage}
						>
							<Progress progress={progress}></Progress>
						</ImageUpload>
					</Field>
				</div>
				<div className="grid grid-cols-1 mb-10">
					<Field>
						<Label htmlFor="content">Content</Label>
						<div className="w-full entry-content">
							<QuillToolbar />
							<ReactQuill
								theme="snow"
								value={content}
								onChange={setContent}
								modules={modules}
								formats={formats}
							/>
						</div>
					</Field>
				</div>

				<Button type="submit" className="mx-auto" isLoading={isSubmitting} isDisabled={loading}>
					Add new post
				</Button>
			</form>
		</PostAddNewStyles>
	);
};
export default PostAddNews;
