import { LoadingSpinner } from 'components/loading';
import { AuthProvider } from 'context/auth-context';
import { SignInPage, SignUpPage } from 'pages';

import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const HomePage = React.lazy(() => import('pages/HomePage'));
const BlogPage = React.lazy(() => import('pages/BlogPage'));
const ContactPage = React.lazy(() => import('pages/ContactPage'));
const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const NotFoundPage = React.lazy(() => import('pages/NotFoundPage'));
const PostDetailsPage = React.lazy(() => import('pages/PostDetailsPage'));
// const SignInPage = React.lazy(() => import('pages/SignInPage'));
// const SignUpPage = React.lazy(() => import('pages/SignUpPage'));

const CategoryAddNew = React.lazy(() => import('modules/category/CategoryAddNew'));
const CategoryManage = React.lazy(() => import('modules/category/CategoryManage'));
const CategoryUpdate = React.lazy(() => import('modules/category/CategoryUpdate'));

const DashboardLayout = React.lazy(() => import('modules/dashboard/DashboardLayout'));

const PostAddNews = React.lazy(() => import('modules/post/postMethodPage/PostAddNews'));
const PostManage = React.lazy(() => import('modules/post/PostManage'));
const PostUpdateNews = React.lazy(() => import('modules/post/postMethodPage/PostUpdateNews'));

const UserAddNew = React.lazy(() => import('modules/users/UserAddNew'));
const UsersManage = React.lazy(() => import('modules/users/UsersManage'));
const UserUpdate = React.lazy(() => import('modules/users/UserUpdate'));

const App = () => {
	return (
		<Suspense
			fallback={
				<div className="flex justify-center items-center w-full mx-auto pt-10 min-h-[100px]">
					<LoadingSpinner size="60px" />
				</div>
			}
		>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<HomePage />}></Route>
					<Route path="/blogs" element={<BlogPage />}></Route>
					<Route path="/blogs/:slug" element={<PostDetailsPage></PostDetailsPage>}></Route>
					<Route path="/contact" element={<ContactPage />}></Route>
					<Route path="/sign-up" element={<SignUpPage />}></Route>
					<Route path="/sign-in" element={<SignInPage />}></Route>
					<Route element={<DashboardLayout></DashboardLayout>}>
						<Route path="/dashboard" element={<DashboardPage></DashboardPage>}></Route>
						<Route path="/manage/posts" element={<PostManage></PostManage>}></Route>
						<Route path="/manage/add-post" element={<PostAddNews></PostAddNews>}></Route>
						<Route path="/manage/update-post" element={<PostUpdateNews></PostUpdateNews>}></Route>
						<Route path="/manage/categories" element={<CategoryManage></CategoryManage>}></Route>
						<Route path="/manage/add-category" element={<CategoryAddNew></CategoryAddNew>}></Route>
						<Route
							path="/manage/update-category"
							element={<CategoryUpdate></CategoryUpdate>}
						></Route>
						<Route path="/manage/users" element={<UsersManage></UsersManage>}></Route>
						<Route path="/manage/add-user" element={<UserAddNew></UserAddNew>}></Route>
						<Route path="/manage/update-user" element={<UserUpdate></UserUpdate>}></Route>
					</Route>
					<Route path="*" element={<NotFoundPage />}></Route>
				</Routes>
			</AuthProvider>
		</Suspense>
	);
};

export default App;
