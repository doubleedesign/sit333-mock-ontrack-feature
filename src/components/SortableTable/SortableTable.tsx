import { FC, useContext } from 'react';
import { EnrolmentContext } from '../EnrolmentContext/EnrolmentContextProvider.tsx';
import { StyledSortableTable } from './SortableTable.style.ts';
import { StatusIcon } from '../StatusIcon/StatusIcon.tsx';
import { DueDateDisplay } from '../DueDateDisplay/DueDateDisplay.tsx';
import { TargetGradeDisplay } from '../TargetGradeDisplay/TargetGradeDisplay.tsx';
import Case from 'case';
import { Tooltip } from 'react-tooltip';

export const SortableTable: FC = () => {
	// TODO: Account for loading status
	const { loading, data, columns } = useContext(EnrolmentContext);

	const cellContent = (row, columnValue) => {
		switch (columnValue) {
			case 'unitName':
				return (
					<>
						<span className={`unit-name--${Case.kebab(row.unitName)}`}>{row.unitName}</span>
						{/** TODO: Only show tooltip if the text is truncated */}
						<Tooltip anchorSelect={`.unit-name--${Case.kebab(row.unitName)}`} place="bottom">
							{row.unitName}
						</Tooltip>
					</>
				);
			case 'status':
				return <StatusIcon status={row.status}/>;
			case 'due_date':
				return <DueDateDisplay due={row.due_date}/>;
			case 'taskTargetGrade':
				return <TargetGradeDisplay grade={row.taskTargetGrade}/>;
			default:
				return row[columnValue];
		}
	};

	return (
		<div className="container">
			<StyledSortableTable>
				<thead>
					<tr>
						{columns.map((column, index) => (
							<th key={column.value} data-fieldkey={column.value}>{column.label}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((row, rowIndex) => (
						<tr key={`${row.unitCode}-${Case.kebab(row.taskName)}`}>
							{columns.map((column, columnIndex) => (
								<td key={columnIndex} data-fieldkey={column.value}>
									{cellContent(row, column.value)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</StyledSortableTable>
		</div>
	);
};
