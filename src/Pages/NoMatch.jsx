import React from "react";
import { CenterBox, ContentWrapper } from "../components/Styles";
import ErrorBg from "../assets/404-bg.gif"

const NoMatch = () => {
	return (
		<CenterBox>
			<ContentWrapper>
				<NoMatchUI>
					<h1>404</h1>
					<h2>Look like you're lost</h2>
					<p>the page you are looking for not avaible!</p>
					<Button type="primary">
						<NavLink to="/" exact>
							Go to Dashboard
						</NavLink>
					</Button>
				</NoMatchUI>
			</ContentWrapper>
		</CenterBox>
	);
};

export default NoMatch;

const NoMatchUI = styled.div`
	background: url(${ErrorBg}) no-repeat center;
	margin: auto;
	width: 1000px;
	text-align: center;
	padding-bottom: 1.5rem;
	h1 {
		font-size: 10rem;
	}
	h2 {
		margin-top: 25rem;
		font-size: 3rem;
	}
	p {
		margin-bottom: 1rem;
		font-size: 1.6rem;
	}
`;
