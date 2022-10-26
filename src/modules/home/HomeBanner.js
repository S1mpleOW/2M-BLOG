import { Button } from 'components/button';
import { useAuth } from 'context/auth-context';
import React from 'react';
import styled from 'styled-components';

const HomeBannerStyled = styled.div`
	min-height: 520px;
	background-image: linear-gradient(
		155deg,
		${(props) => props.theme.primary} 6.67%,
		${(props) => props.theme.secondary} 84.1%
	);
	.banner {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 35px;
		&-content {
			color: white;
			margin-bottom: 20px;
			max-width: 600px;
		}
		&-desc {
			line-height: 1.75;
			margin-bottom: 40px;
		}
		&-button {
			width: unset;
			box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
			color: ${(props) => props.theme.secondary};
			background: #fff;
			&:hover {
				opacity: 0.8;
			}
		}
	}
`;

const HomeBanner = () => {
	const { user } = useAuth();
	return (
		<HomeBannerStyled>
			<div className="container">
				<div className="banner">
					<div className="banner-content">
						<h1 className="banner-heading">Monkey Blogging</h1>
						<p className="banner-desc">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia debitis fugit ipsa
							adipisci illo libero quos perspiciatis, dolorem quo officia soluta neque ad dolores
							iure ex? Soluta debitis dolor minima.
						</p>
						<Button
							to={user?.displayName ? '/blog' : '/sign-up'}
							type="button"
							className="banner-button"
						>
							Get Started
						</Button>
					</div>
					<div className="banner-image">
						<img src="./HomeBanner.png" alt="banner" />
					</div>
				</div>
			</div>
		</HomeBannerStyled>
	);
};

export default HomeBanner;
