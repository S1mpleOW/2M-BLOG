import React from 'react';
import styled from 'styled-components';
import { signOut } from 'firebase/auth';
import { auth } from 'firebaseSrc/firebase-config';
import { toast } from 'react-toastify';
import propsType from 'prop-types';

const HeaderUserDisplay = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 10px;
	padding: 10px 20px;
	border: 3px solid ${(props) => props.theme.grayLight};
	cursor: pointer;
	position: relative;
	min-width: 150px;
	&:hover {
		background-color: ${(props) => props.theme.grayLight};
	}
	.text {
		color: ${(props) => props.theme.grayDark};
	}
	.sub-menu {
		position: absolute;
		top: calc(100% + 10px);
		left: 0;
		border-radius: 10px;
		padding: 10px 20px;
		border: 3px solid ${(props) => props.theme.grayLight};
		width: 100%;
		min-width: 100px;
		cursor: pointer;
		opacity: 0;
		text-align: center;
		visibility: hidden;
		transition: all 0.3s ease-in-out;
		span {
			display: inline-block;
		}
		&:after {
			content: '';
			position: absolute;
			top: -10px;
			left: 0;
			width: 100%;
			height: 10px;
			background-color: transparent;
		}
	}
	&:hover .sub-menu {
		opacity: 1;
		visibility: visible;
		&:hover {
			background-color: ${(props) => props.theme.grayLight};
		}
	}
`;
const Logout = ({ user, setUser }) => {
	const handleLogout = () => {
		signOut(auth).then(() => {
			toast.success('Logged out successfully');
			setUser(null);
		});
	};
	return (
		<HeaderUserDisplay>
			<span className="text">{user?.displayName}</span>
			<div className="sub-menu" onClick={handleLogout}>
				<span>Logout</span>
			</div>
		</HeaderUserDisplay>
	);
};

propsType.Logout = {
	user: propsType.object.isRequired,
	setUser: propsType.func.isRequired,
};

export default Logout;
