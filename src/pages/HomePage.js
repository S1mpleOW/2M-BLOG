import styled from 'styled-components';
import Layout from 'components/layout/Layout';
import HomeBanner from 'modules/home/HomeBanner';
import HomeFeature from 'modules/home/HomeFeature';
import HomeNewest from 'modules/home/HomeNewest';

const HomePageStyled = styled.div`
	background-color: azure;
`;

const HomePage = () => {
	return (
		<HomePageStyled>
			<Layout>
				<HomeBanner></HomeBanner>
				<HomeFeature></HomeFeature>
				<HomeNewest></HomeNewest>
			</Layout>
		</HomePageStyled>
	);
};

export default HomePage;
