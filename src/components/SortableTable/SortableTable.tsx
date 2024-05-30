import { FC, useContext, useState, useCallback } from 'react';
import { EnrolmentContext } from '../EnrolmentContext/EnrolmentContextProvider.tsx';
import { StyledSortableTable } from './SortableTable.style.ts';
import { StatusIcon } from '../StatusIcon/StatusIcon.tsx';
import { DueDateDisplay } from '../DueDateDisplay/DueDateDisplay.tsx';
import { TargetGradeDisplay } from '../TargetGradeDisplay/TargetGradeDisplay.tsx';
import Case from 'case';
import { Tooltip } from 'react-tooltip';
import { SortingButton } from '../SortingButton/SortingButton.tsx';

export const SortableTable: FC = () => {
	// TODO: Account for loading status
	const { loading, data, sort, columns, sortableColumns } = useContext(EnrolmentContext);
	const [ordering, setOrdering] = useState<{[key: string]: 'asc' | 'desc'}>(() => {
		const order = {};
		sortableColumns.forEach(column => {
			Object.assign(order, { [column.value]: 'asc' });
		});
		return order;
	});
	const [activeSortField, setActiveSortField] = useState<string>('due_date');

	const handleSort = useCallback((e) => {
		const field = e.currentTarget.closest('th').dataset.fieldkey;
		const newOrder = ordering[field] === 'asc' ? 'desc' : 'asc';

		sort(field, newOrder);

		setActiveSortField(field);

		setOrdering(prevOrdering => ({
			...prevOrdering,
			[field]: newOrder,
		}));
	}, [sort, ordering]);

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
							<th key={column.value} data-fieldkey={column.value}>
								{sortableColumns.find(sortable => column.value === sortable.value) ? (
									<SortingButton label={column.label} direction={ordering[column.value]} onClick={handleSort} active={activeSortField === column.value}/>
								) : (
									<>{column.label}</>
								)}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((row, rowIndex) => (
						<tr key={`${row.unitCode}-${Case.kebab(row.taskName)}`} data-testId={`row-task-def-${row.task_definition_id}`}>
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
