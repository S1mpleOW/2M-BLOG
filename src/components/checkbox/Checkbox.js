import React from 'react';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';

const Checkbox = ({ checked, children, control, name, ...rest }) => {
	const { field } = useController({
		control,
		name,
		defaultValue: '',
	});
	return (
		<label>
			<input
				onChange={() => {}}
				checked={checked}
				type="checkbox"
				className="hidden-input"
				{...field}
				{...rest}
			/>
			<div className="flex items-center font-medium cursor-pointer gap-x-3">
				<div
					className={`w-7 h-7 rounded flex items-center justify-center ${
						checked ? 'bg-green-400 text-white' : 'bg-gray-200 text-transparent'
					}`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-6 h-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<span>{children}</span>
			</div>
		</label>
	);
};

Checkbox.propTypes = {
	checked: PropTypes.bool,
	children: PropTypes.node,
	control: PropTypes.object,
	name: PropTypes.string,
};

export default Checkbox;
