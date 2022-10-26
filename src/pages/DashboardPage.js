import { DashboardHeading } from 'modules/dashboard';
import React, { useEffect } from 'react';

const DashboardPage = () => {
	useEffect(() => {
		document.title = 'Monkey - Dashboard';
	}, []);
	return (
		<div>
			<DashboardHeading title="Dashboard"></DashboardHeading>
		</div>
	);
};

export default DashboardPage;
