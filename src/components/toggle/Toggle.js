import React from 'react';
import PropTypes from 'prop-types';

const Toggle = ({ on, onClick, ...rest }) => {
	return (
		<>
			<input type="checkbox" checked={on} className="hidden-input" onChange={() => {}} />
			<div
				className={`inline-block w-[70px] h-[42px] relative cursor-pointer rounded-full p-1 transition-all ${
					on ? 'bg-green-500' : 'bg-gray-300'
				}`}
				onClick={onClick}
				{...rest}
			>
				<span
					className={`transition-all w-[34px] h-[34px] bg-white rounded-full inline-block ${
						on ? 'translate-x-[28px]' : ''
					}`}
				></span>
			</div>
		</>
	);
};

Toggle.propTypes = {
	on: PropTypes.bool,
	onClick: PropTypes.func,
};

export default Toggle;
