import { Button } from 'components/button';
import Logout from 'components/logout/Logout';
import { useAuth } from 'context/auth-context';
import SearchIcon from 'icon/SearchIcon';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const HeaderStyled = styled.header`
	padding: 15px 0;
	.header-main {
		display: flex;
		align-items: center;
	}
	.logo {
		display: block;
		max-width: 40px;
	}
	.menu {
		display: flex;
		align-items: center;
		gap: 20px;
		margin-left: 40px;
		list-style: none;
	}
	.header-right {
		flex: 1;
		display: flex;
		align-items: stretch;
		gap: 15px;
		.header-button {
			width: 100%;
			max-width: 150px;
		}
	}
	.search {
		padding: 15px;
		border: 1px solid ${({ theme }) => theme.secondary};
		margin-left: auto;
		border-radius: 10px;
		width: 100%;
		max-width: 320px;
		display: flex;
		align-items: center;
		column-gap: 15px;
		input {
			border: none;
			outline: none;
			flex: 1;
			display: inline-block;
			width: 100%;
			background-color: transparent;
		}
		.icon {
			cursor: pointer;
		}
	}
	.active {
		color: ${(props) => props.theme.primary};
	}
`;

const menuLinks = [
	{
		title: 'Home',
		url: '/',
	},
	{
		title: 'Blogs',
		url: '/blogs',
	},
	{
		title: 'Contact',
		url: '/contact',
	},
];

const Header = () => {
	const { user, setUser } = useAuth();
	return (
		<HeaderStyled>
			<div className="container">
				<div className="header-main">
					<NavLink to="/">
						<img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
					</NavLink>
					<ul className="menu">
						{menuLinks.map((item) => {
							return (
								<li key={item.title} className="menu-item">
									<NavLink
										to={item.url}
										className={`${({ isActive }) => (isActive ? 'active' : undefined)} menu-link `}
									>
										{item.title}
									</NavLink>
								</li>
							);
						})}
					</ul>
					<div className="header-right">
						<div className="search">
							<input type="text" placeholder="Search" />
							<SearchIcon className="icon" size="20px" />
						</div>
						{!user ? (
							<Button className="header-button min-w-[200px]" height="57px" to="/sign-in">
								Sign in
							</Button>
						) : (
							<Logout user={user} setUser={setUser}></Logout>
						)}
					</div>
				</div>
			</div>
		</HeaderStyled>
	);
};

export default Header;
