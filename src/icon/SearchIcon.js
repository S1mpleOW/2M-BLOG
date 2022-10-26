import React from 'react';

const SearchIcon = ({ size = '10px', className = '', onClick = () => {}, ...props }) => {
	return (
		<span className={className} onClick={onClick} {...props}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth="2"
				style={{ width: size, height: size }}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>
		</span>
	);
};

export default SearchIcon;
