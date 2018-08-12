import styled from 'styled-components';
import { Layout } from 'antd';

export const Container = styled(Layout)`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const TodoContainer = styled.div`
	margin: auto 0;
	min-width: 30rem;
`;
