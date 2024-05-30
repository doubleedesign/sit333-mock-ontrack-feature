import { ChangeEvent, FC, useCallback, useContext, useState } from 'react';
import { EnrolmentContext } from '../EnrolmentContext/EnrolmentContextProvider.tsx';
import { FilterBarItem, StyledFilterBar } from './FilterBar.style.ts';
import { useSelect } from 'downshift';
import { TargetGrades } from '../../constants.ts';
import Case from 'case';

export const FilterBar: FC = () => {
	const { filterableColumns, sortableColumnValues, filter } = useContext(EnrolmentContext);
	const [selectedFilter, setSelectedFilter] = useState<string>('');

	const handleFilterChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
		if(e.target.value === '') {
			filter('', '');
		}
		setSelectedFilter(e.target.value);
	}, [filter]);

	const handleFilterSelection = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
		const field = selectedFilter;
		const value = e.target.value;
		filter(field, value);
	}, [filter, selectedFilter]);

	return (
		<StyledFilterBar className="filter-bar container" data-testid="FilterBar">
			<FilterBarItem>
				<label htmlFor="column">Filter by:</label>
				<select id="column" onChange={handleFilterChange}>
					<option value="">Select a column</option>
					{filterableColumns.map((column, index) => (
						<option key={index} value={column.value}>{column.value === 'taskTargetGrade' ? 'Target grade' : column.label}</option>
					))}
				</select>
			</FilterBarItem>
			<FilterBarItem className="filter-bar-item">
				<label htmlFor="value">Value:</label>
				{selectedFilter ? (
					<select id="value" onChange={handleFilterSelection}>
						<option value="">Select a value</option>
						{sortableColumnValues.find(value => value.value === selectedFilter)?.values.map((value, index) => (
							<option key={index} value={value}>
								{selectedFilter === 'taskTargetGrade'
									? TargetGrades[value]
									: value.length > 20
										? `${Case.sentence(value).slice(0, 20)}...`
										: ['unitCode', 'unitName'].includes(selectedFilter) ? value : Case.sentence(value)
								}
							</option>
						))}
					</select>
				) : (
					<select id="value" disabled><option value="">Select a value</option></select>
				)}
			</FilterBarItem>
		</StyledFilterBar>
	);
};
