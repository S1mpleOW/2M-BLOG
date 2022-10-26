import { Button } from 'components/button';
import NotFoundIcon from 'icon/NotFoundIcon';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundPageStyled = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	.logo {
		display: inline-block;
		margin-bottom: 40px;
	}
	.title {
		display: flex;
		align-items: flex-start;
		gap: 20px;
	}
	.title-text {
		font-size: 60px;
		font-weight: bold;
		text-transform: uppercase;
	}
	.description {
		margin-top: 20px;
		p {
			font-size: 18px;
		}
	}
	.button {
		display: inline-block;
		max-width: 200px;
		margin-top: 40px;
	}
`;

const NotFoundPage = ({ title = 'Oops! Page not found', description = '' }) => {
	return (
		<NotFoundPageStyled>
			<NavLink to="/" className="logo">
				<img srcSet="/logo.png 2x" alt="monkey blogging" />
			</NavLink>
			<div className="title">
				<h1 className="title-text">{title}</h1>
				<NotFoundIcon></NotFoundIcon>
			</div>
			<div className="description">
				<p>{description}</p>
			</div>
			<Button className="button" to="/">
				Back to home
			</Button>
		</NotFoundPageStyled>
	);
};

export default NotFoundPage;
