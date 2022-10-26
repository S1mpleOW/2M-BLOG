import { ActionDelete, ActionEdit, ActionView } from 'components/action';
import { LabelStatus } from 'components/label';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { categoryStatus, postStatus, roles, userStatus } from 'utils/constants';

const ManageTable = ({ isLoading, items, handleDelete = () => {}, type = 'categories' }) => {
	const navigate = useNavigate();
	return (
		<>
			{type === 'categories' && (
				<tbody>
					{!isLoading &&
						items.length > 0 &&
						items.map((category, index) => (
							<tr key={category.id}>
								<td>{index}</td>
								<td>{category?.name}</td>
								<td>
									<Link
										to={`/category/${category?.slug}`}
										className="inline-block italic text-gray-400 capitalize whitespace-nowrap"
									>
										{category?.slug}
									</Link>
								</td>
								<td>
									{category?.status === categoryStatus['APPROVED'] && (
										<LabelStatus type="success">Approved</LabelStatus>
									)}
									{category?.status === categoryStatus['UNAPPROVED'] && (
										<LabelStatus type="danger">Unapproved</LabelStatus>
									)}
								</td>
								<td className="flex items-center gap-2">
									<ActionView></ActionView>
									<ActionEdit
										onClick={() => navigate(`/manage/update-category?id=${category.id}`)}
									></ActionEdit>
									<ActionDelete onClick={() => handleDelete(category.id)}></ActionDelete>
								</td>
							</tr>
						))}
				</tbody>
			)}
			{type === 'users' && (
				<tbody>
					{!isLoading &&
						items.length > 0 &&
						items.map((user, index) => (
							<tr key={user.uid}>
								<td>{index + 1}</td>
								<td className="text-single">{user?.displayName}</td>
								<td className="text-single">{user?.email}</td>
								<td>{new Date(user?.createdAt?.seconds * 1000).toLocaleDateString('vi-VI')}</td>
								<td>
									{user?.status === userStatus['ACTIVE'] && (
										<LabelStatus type="success">Approved</LabelStatus>
									)}
									{user?.status === userStatus['PENDING'] && (
										<LabelStatus type="warning">Pending</LabelStatus>
									)}
									{user?.status === userStatus['BANNED'] && (
										<LabelStatus type="danger">Banned</LabelStatus>
									)}
									{user?.status === userStatus['LOCKED'] && (
										<LabelStatus type="default">Locked</LabelStatus>
									)}
									{user?.status === userStatus['DELETED'] && (
										<LabelStatus type="remove">Deleted</LabelStatus>
									)}
								</td>
								<td>
									{user?.role === roles['USER'] && 'USER'}
									{user?.role === roles['MOD'] && 'MODERATOR'}
									{user?.role === roles['ADMIN'] && 'ADMIN'}
								</td>
								<td className="flex items-center gap-2">
									<ActionView></ActionView>
									<ActionEdit
										onClick={() => navigate(`/manage/update-user?id=${user.uid}`)}
									></ActionEdit>
									<ActionDelete onClick={() => handleDelete(user.uid)}></ActionDelete>
								</td>
							</tr>
						))}
				</tbody>
			)}
			{type === 'posts' && (
				<tbody>
					{!isLoading &&
						items.length > 0 &&
						items.map((post, index) => (
							<tr key={post.id} className="">
								<td>{index + 1}</td>
								<td>
									<div className="flex items-center gap-2">
										<img
											src={post?.image}
											alt=""
											className="w-[66px] h-[55px] rounded object-cover"
										/>
										<div className="flex-1 ">
											<h3 className="font-semibold text-truncate !max-w-[300px] ">{post?.title}</h3>
											<time className="text-sm text-gray-500">
												{new Date(post?.createdAt?.seconds * 1000).toLocaleDateString('vi-VI')}
											</time>
										</div>
									</div>
								</td>
								<td>{post?.category?.name}</td>
								<td>{post?.user?.name}</td>
								<td>
									{post?.status === postStatus['APPROVED'] && (
										<LabelStatus type="success">Approved</LabelStatus>
									)}
									{post?.status === postStatus['PENDING'] && (
										<LabelStatus type="warning">Pending</LabelStatus>
									)}
									{post?.status === postStatus['REJECTED'] && (
										<LabelStatus type="danger">Rejected</LabelStatus>
									)}
								</td>
								<td>
									<div className="flex items-center gap-x-2">
										<ActionView
											onClick={() => {
												navigate(`/${post.slug}`);
											}}
										></ActionView>
										<ActionEdit
											onClick={() => navigate(`/manage/update-post?id=${post.id}`)}
										></ActionEdit>
										<ActionDelete onClick={() => handleDelete(post.id)}></ActionDelete>
									</div>
								</td>
							</tr>
						))}
				</tbody>
			)}
		</>
	);
};

export default ManageTable;
