import { FC, useMemo } from 'react';
import { StyledDueDateDisplay } from './DueDateDisplay.style';
import {
	format,
	formatDistance,
	isWithinInterval,
	add,
	formatRelative,
	isSameDay,
	isBefore,
	differenceInCalendarWeeks, differenceInDays
} from 'date-fns';

type DueDateDisplayProps = {
	due: string;
}

export const DueDateDisplay: FC<DueDateDisplayProps> = ({ due }) => {
	// TODO: This is a fake date for testing, replace with real date in non-test environment
	const today = new Date('2024-04-01');
	const dueDate = new Date(due);

	const description = useMemo(() => {
		if(isBefore(dueDate, today)) {
			return `${formatDistance(dueDate, today)} ago`;
		}
		else if(isSameDay(dueDate, today)) {
			return 'Today';
		}
		else if(isSameDay(dueDate, add(today, { days: 1 }))) {
			return 'Tomorrow';
		}
		else if(isWithinInterval(dueDate, { start: today, end: add(today, { days: 7 }) })) {
			return `in ${differenceInDays(dueDate, today)} days`;
		}
		else if(isWithinInterval(dueDate, { start: today, end: add(today, { days: 21 }) })) {
			return `in about ${differenceInCalendarWeeks(dueDate, today)} weeks`;
		}
		else {
			return `in ${formatDistance(dueDate, today, { includeSeconds: false })}`;
		}
	}, [dueDate, today]);

	return (
		<StyledDueDateDisplay data-testId="DueDateDisplay">
			<span>{format(dueDate, 'EEE dd MMM')}</span>
			<span>{description}</span>
		</StyledDueDateDisplay>
	);
};
