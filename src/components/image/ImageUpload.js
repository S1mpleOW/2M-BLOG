import React from 'react';
import { useController } from 'react-hook-form';

const ImageUpload = ({
	name = '',
	className = '',
	control,
	id = name,
	progress = 0,
	image = '',
	handleSelectImage = () => {},
	handleDeleteImage = () => {},
	children,
	...rest
}) => {
	const {
		field,
		fieldState: { error },
	} = useController({
		control,
		name,
	});
	return (
		<>
			<label
				className={`cursor-pointer flex items-center justify-center bg-gray-100 border border-dashed w-full min-h-[200px] rounded-lg relative overflow-hidden group ${className}`}
				htmlFor={id}
			>
				{!image && (
					<>
						<input
							type="file"
							id={id}
							className="hidden-input"
							accept="image/*"
							name={name}
							{...rest}
							onChange={(e) => {
								const originalOnChange = field.onChange(e);
								handleSelectImage(e);
								return originalOnChange;
							}}
						/>
						<div className="flex flex-col items-center text-center pointer-events-none">
							<img src="/img-upload.png" alt="upload-img" className="max-w-[80px] mb-5" />
							<p className="font-semibold">Choose photo</p>
						</div>
					</>
				)}
				{image && (
					<div className="max-h-[400px] relative">
						<img src={image} className="object-cover w-full h-full" alt="" />
						<button
							type="button"
							className="absolute z-50 flex items-center justify-center invisible w-16 h-16 text-red-500 transition-all -translate-x-1/2 -translate-y-1/2 bg-white rounded-full opacity-0 cursor-pointer top-1/2 left-1/2 group-hover:opacity-100 group-hover:visible"
							onClick={handleDeleteImage}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-6 h-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth="2"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
								/>
							</svg>
						</button>
					</div>
				)}
				{children}
			</label>
			<p className="error-message">{error?.message || ''}</p>
		</>
	);
};

export default ImageUpload;
