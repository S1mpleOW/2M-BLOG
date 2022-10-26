import React from 'react';

const InputSearch = ({ defaultSearch = '', onChange = () => {} }) => {
	return (
		<div className="w-full max-w-[300px]">
			<input
				type="text"
				defaultValue={defaultSearch}
				onChange={onChange}
				className="w-full p-4 border border-gray-300 border-solid rounded-lg"
				placeholder="Search..."
			/>
		</div>
	);
};

export default InputSearch;
