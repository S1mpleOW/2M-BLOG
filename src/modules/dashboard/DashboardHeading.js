import React from 'react';

const DashboardHeading = ({ title = '', desc = '', children }) => {
	return (
		<div className="flex items-start justify-between mb-10">
			<div className="flex flex-col justify-center gap-3">
				<h1 className="dashboard-heading">{title}</h1>
				<p className="dashboard-short-desc">{desc}</p>
			</div>
			{children}
		</div>
	);
};

export default DashboardHeading;
