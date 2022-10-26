import { useDropdown } from 'context/dropdown-context';
import React from 'react';

const List = ({ children, classNameBody }) => {
	const { show } = useDropdown();
	return (
		<>
			{show && (
				<div
					className={`absolute top-full left-0 w-full bg-white shadow-sm z-1 border border-solid border-gray-300 rounded-[10px] rounded-t-none ${classNameBody}`}
				>
					{children}
				</div>
			)}
		</>
	);
};

export default List;
