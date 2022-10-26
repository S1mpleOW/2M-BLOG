import React, { useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { NavLink, useNavigate } from 'react-router-dom';
import notify from 'helper/notify';
import { useAuth } from 'context/auth-context';

const AuthenStyled = styled.div`
	min-height: 100vh;
	padding: 40px;
	background-color: azure;
	.logo {
		margin: 0 auto 20px;
	}
	.heading {
		text-align: center;
		color: ${(props) => props.theme.primary};
		font-size: 40px;
		font-weight: 600;
		margin-bottom: 50px;
	}
	.form {
		max-width: 600px;
		margin: 0 auto;
	}
	.error {
		color: red;
		font-size: 18px;
		font-weight: bold;
	}
	.have-account {
		margin-bottom: 20px;
		a {
			display: inline-block;
			color: ${(props) => props.theme.primary};
		}
	}
	.home {
		display: inline-block;
		margin-left: 50%;
		transform: translateX(-50%);
		transition: all 0.5s ease-in-out;
	}
	.home:hover {
		transform: translate(-50%, -10px);
	}
`;

const AuthenPage = ({ errors, children }) => {
	const { user } = useAuth();
	const navigate = useNavigate();

	useLayoutEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [navigate, user]);

	useEffect(() => {
		if (errors) {
			notify('error', Object.values(errors)[0]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [errors]);
	return (
		<AuthenStyled>
			<div className="container">
				<NavLink to="/" className="home">
					<img srcSet="/logo.png 2x" alt="monkey-blogging" loading="lazy" className="logo" />
				</NavLink>
				<h1 className="heading">Monkey Blogging</h1>
				{children}
			</div>
		</AuthenStyled>
	);
};

AuthenPage.propsType = {
	errors: PropTypes.array,
	children: PropTypes.element || PropTypes.node,
};

export default AuthenPage;
