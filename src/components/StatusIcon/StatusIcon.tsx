import { FC, useMemo } from 'react';
import { TaskStatus } from '../../types.ts';
import { StyledStatusIcon } from './StatusIcon.style';
import { Tooltip } from 'react-tooltip';
import * as Case from 'case';

type StatusIconProps = {
	status: TaskStatus;
}

export const StatusIcon: FC<StatusIconProps> = ({ status }) => {
	const icon = useMemo(() => {
		switch (status) {
			case 'complete':
				return <i className="fa-solid fa-check"></i>;
			case 'ready_for_feedback':
				return <i className="fa-solid fa-thumbs-up"></i>;
			case 'discuss':
				return <i className="fa-solid fa-comments"></i>;
			case 'working_on_it':
				return <i className="fa-solid fa-bolt"></i>;
			case 'not_started':
				return <i className="fa-solid fa-pause"></i>;
			case 'fix_and_resubmit':
				return <i className="fa-solid fa-wrench"></i>;
			case 'time_exceeded':
				return <i className="fa-solid fa-exclamation"></i>;
			default:
				return <></>;
		}
	}, [status]);

	return (
		<StyledStatusIcon data-testid="StatusIcon" $status={status} aria-label={`Task status: ${Case.sentence(status)}`}>
			<span className={`status-icon--${status}`}>{icon}</span>
			<Tooltip anchorSelect={`.status-icon--${status}`} place="bottom">
				{Case.sentence(status)}
			</Tooltip>
		</StyledStatusIcon>
	);
};
