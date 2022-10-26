import { useDropdown } from 'context/dropdown-context';
import React from 'react';

const Search = ({ placeholder, ...props }) => {
	const { onChange } = useDropdown();
	return (
		<div className="p-2">
			<input
				type="text"
				placeholder={placeholder}
				className="p-4 outline-none w-full border border-gray-200 rounded"
				onChange={onChange}
				{...props}
			/>
		</div>
	);
};

export default Search;
