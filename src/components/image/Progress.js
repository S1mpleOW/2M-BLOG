import React, { useEffect } from 'react';

const Progress = ({ progress = 0 }) => {
	// useEffect(() => {
	// 	if (progress === 100) {
	// 		setTimeout(() => {
	// 			const progressBar = document.querySelector('.image-upload-progress');
	// 			if (progressBar) {
	// 				progressBar.style.width = '0%';
	// 			}
	// 		}, 500);
	// 	}
	// }, [progress]);
	return (
		<div
			className="absolute bottom-0 left-0 w-10 h-1 transition-all duration-500 ease-in-out bg-green-400 image-upload-progress"
			style={{
				width: `${Math.ceil(progress)}%`,
			}}
		></div>
	);
};

export default Progress;
