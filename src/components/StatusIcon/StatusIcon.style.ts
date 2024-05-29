import styled from 'styled-components';
import { TaskStatus } from '../../types.ts';
import { statusColours } from '../../constants.ts';
import { meetsContrastGuidelines, readableColor, shade } from 'polished';
import { ContrastScores } from 'polished/lib/types/color';

export const StyledStatusIcon = styled.span<{ $status: TaskStatus }>`
	background-color: ${props => statusColours[props.$status]};
	color: ${props => {
		const scores: ContrastScores = meetsContrastGuidelines(shade(0.1, statusColours[props.$status]), 'white');
		return scores.AALarge ? '#FFF' : readableColor(statusColours[props.$status]);
	}};
	width: 2rem;
	height: 2rem;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.25rem;
	line-height: 1;
`;
