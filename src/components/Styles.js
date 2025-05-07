import styled from "styled-components";

export const ContentWrapper = styled.div`
	background-color: #fff;
	border: 1px solid #d9d9d9;
	border-radius: 5px;
	margin-top: 15px;
	min-height: 250px;
	position: relative;
`;
export const CenterBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	left: 0;
	top: ${(props) => props.top || 0};
	right: 0;
	bottom: 0;
`;
