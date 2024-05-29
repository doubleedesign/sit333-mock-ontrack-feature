import { FC, useMemo } from 'react';
import { StyledTargetGradeDisplay } from './TargetGradeDisplay.style';
import { TargetGrades } from '../../constants.ts';
import { Tooltip } from 'react-tooltip';
import Case from 'case';

type TargetGradeDisplayProps = {
	grade: number;
}

export const TargetGradeDisplay: FC<TargetGradeDisplayProps> = ({ grade }) => {
	const icon = useMemo(() => {
		switch (grade) {
			case 0:
				return <i className="fa-duotone fa-signal-fair"></i>;
			case 1:
				return <i className="fa-duotone fa-signal-good"></i>;
			case 2:
				return <i className="fa-duotone fa-signal-strong"></i>;
			case 3:
				return <i className="fa-solid fa-signal"></i>;
			default:
				return '';
		}
	}, [grade]);

	return (
		<StyledTargetGradeDisplay data-testid="TargetGradeDisplay" aria-label={`Target grade: ${TargetGrades[grade]}`}>
			<span className={`targetGrade--${Case.kebab(TargetGrades[grade])}`}>
				{icon}
			</span>
			<Tooltip anchorSelect={`.targetGrade--${Case.kebab(TargetGrades[grade])}`} place="bottom">
				{TargetGrades[grade]}
			</Tooltip>
		</StyledTargetGradeDisplay>
	);
};
