import { LoadingSpinner } from 'components/loading';
import { useAuth } from 'context/auth-context';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'firebaseSrc/firebase-config';
import { NotFoundPage } from 'pages';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { roles } from 'utils/constants';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
const DashboardStyled = styled.div`
	max-width: 1900px;
	margin: 0 auto;
	.dashboard {
		&-heading {
			font-weight: bold;
			font-size: 36px;
			color: ${(props) => props.theme.primary};
			letter-spacing: 1px;
		}
		&-main {
			display: grid;
			grid-template-columns: 300px minmax(0, 1fr);
			padding: 40px 20px;
			gap: 0 40px;
			align-items: start;
		}
	}
`;
const DashboardLayout = () => {
	const { user } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [isAdmin, setIsAdmin] = useState(true);
	useEffect(() => {
		(async () => {
			setIsLoading(true);
			const colRef = collection(db, 'users');
			const queryCols = query(colRef, where('email', '==', user.email));
			const querySnapshot = getDocs(queryCols);
			querySnapshot.then((snapshot) => {
				snapshot.forEach((doc) => {
					if (doc.data().role !== roles['ADMIN']) {
						setIsAdmin(false);
					}
				});
			});
			setIsLoading(false);
		})();
	}, [user]);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center w-full mx-auto pt-10 min-h-[100px]">
				<LoadingSpinner size="60px" />
			</div>
		);
	}

	if (!isAdmin && !isLoading) {
		return <NotFoundPage description="You dont have permission to access this page" />;
	}

	return (
		<DashboardStyled>
			<DashboardHeader></DashboardHeader>
			<div className="dashboard-main">
				<Sidebar></Sidebar>
				<div className="dashboard-children">
					<Outlet></Outlet>
				</div>
			</div>
		</DashboardStyled>
	);
};
export default DashboardLayout;
