import React from 'react';

const NotFoundIcon = ({ ...props }) => {
	return (
		<span {...props}>
			<img srcSet="/not-found.png 5x" alt="404-not-found" />
		</span>
	);
};

export default NotFoundIcon;
