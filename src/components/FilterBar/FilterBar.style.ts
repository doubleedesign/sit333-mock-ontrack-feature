import styled from 'styled-components';
import { readableColor, shade } from 'polished';

export const StyledFilterBar = styled.div`
	background: ${shade(0.2, '#337ab7')};
	color: ${readableColor(shade(0.2, '#337ab7'))};
	padding: 1rem;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 1rem;
`;

export const FilterBarItem = styled.div`
	
	label {
		font-size: 0.9rem;
		font-weight: 600;
		display: inline-block;
		margin-right: 0.5rem;
	}
	
	select {
		font-size: 0.9rem;
		padding: 0.25rem;
		min-width: 12rem;
	}
`;
