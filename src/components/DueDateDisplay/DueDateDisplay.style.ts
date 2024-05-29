import styled from 'styled-components';

export const StyledDueDateDisplay = styled.div`
	display: flex;
	flex-wrap: nowrap;
	align-items: center;

	span {
		display: block;
		
		&:nth-child(1) {
			width: 6rem;
			flex-basis: 6rem;
		}
		
		&:nth-child(2) {
			font-size: 0.8em;
		}
	}
`;
