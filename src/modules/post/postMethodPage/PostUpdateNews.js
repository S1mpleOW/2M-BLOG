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
import { DashboardHeading } from 'modules/dashboard';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { categoryStatus, postStatus } from 'utils/constants';
import useFirebaseImage from 'hooks/useFirebaseImage';
import * as yup from 'yup';
import {
	collection,
	doc,
	getDoc,
	onSnapshot,
	query,
	serverTimestamp,
	updateDoc,
	where,
} from 'firebase/firestore';
import { auth, db, storage } from 'firebaseSrc/firebase-config';
import { useSearchParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { QuillToolbar, formats, modules } from 'components/editorText';
import notify from 'helper/notify';
import { deleteObject, ref } from 'firebase/storage';

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

const PostUpdateNews = () => {
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
			category: {},
			categoryId: '',
			user: {},
			userId: '',
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

	const [queries] = useSearchParams();
	const idPost = queries.get('id');
	const [content, setContent] = useState('');

	useEffect(() => {
		if (!idPost) return;
		try {
			(async () => {
				const docRef = doc(db, 'posts', idPost);
				const posts = await getDoc(docRef);
				if (posts.exists()) {
					const { ...rest } = posts.data();
					if (rest.image) {
						setImage(rest.image);
					}
					setContent(rest?.content || '');
					reset(rest);
				}
			})();
		} catch (e) {
			console.log(e);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [idPost]);

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

	useEffect(() => {
		if (watchCategory.name && categories.length > 0) {
			const selectFind = categories.find((category) => category.id === watchCategory);
			if (selectFind) {
				setSelect({
					id: selectFind.id,
					name: selectFind.name,
					slug: selectFind.slug,
				});
				setValue('categoryId', selectFind.id);
				clearErrors('category');
			}
		} else {
			setSelect('Please select an option');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watchCategory, categories]);

	if (!idPost) return <div>Not found</div>;

	const handleReset = () => {
		setFile({});
		setImage('');
		setProgress(0);
		setContent('');
	};
	const updatePostHandler = async (data) => {
		if (!isValid) return;
		console.log(data);
		return new Promise((resolve, reject) => {
			const timeout = setTimeout(async () => {
				const param = { ...data, image, content };
				await updateDoc(doc(db, 'posts', idPost), {
					...param,
					updatedAt: serverTimestamp(),
				})
					.then(async () => {
						if (file) {
							if (file.name) {
								await handleUploadImage(file).then(async (image) => {
									const docRef = doc(db, 'posts', idPost);
									await updateDoc(docRef, { avatar: image });
								});
							}
							if (file.imageDelete) {
								const storageRef = ref(storage, 'images/' + file.imageDelete);
								await deleteObject(storageRef);
							}
						}
					})
					.then(() => {
						reset({
							title: '',
							slug: '',
							status: postStatus['PENDING'],
							category: {},
							categoryId: '',
							image: '',
							hot: false,
						});
						handleReset();
						notify('success', 'User updated successfully');
					})
					.catch((error) => {
						notify('error', error.message);
						reject(error);
					});
				resolve();
			}, 1000);
			return () => clearTimeout(timeout);
		});
	};
	return (
		<>
			<DashboardHeading title="Update post"></DashboardHeading>
			<form onSubmit={handleSubmit(updatePostHandler)}>
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
				<div className="w-full mb-10">
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
					Update post
				</Button>
			</form>
		</>
	);
};

export default PostUpdateNews;
