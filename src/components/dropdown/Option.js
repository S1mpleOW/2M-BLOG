import { useDropdown } from 'context/dropdown-context';
import React from 'react';

const Option = ({ onClick, children, ...props }) => {
	const { show, setShow } = useDropdown();
	const handleClick = () => {
		onClick && onClick();
		setShow(false);
	};
	return (
		<div
			className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-100"
			onClick={handleClick}
			{...props}
		>
			{children}
		</div>
	);
};

export default Option;
