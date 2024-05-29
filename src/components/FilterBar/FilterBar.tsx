import { ChangeEvent, FC, useCallback, useContext, useState } from 'react';
import { EnrolmentContext } from '../EnrolmentContext/EnrolmentContextProvider.tsx';

export const FilterBar: FC = () => {
	const { sortableColumns, sortableColumnValues, sort, filter } = useContext(EnrolmentContext);
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
		<div className="filter-bar" data-testid="FilterBar">
			<div className="filter-bar-item">
				<label htmlFor="column">Filter by:</label>
				<select id="column" onChange={handleFilterChange}>
					<option value="">Select a column</option>
					{sortableColumns.map((column, index) => (
						<option key={index} value={column.value}>{column.label}</option>
					))}
				</select>
			</div>
			{selectedFilter && (
				<div className="filter-bar-item">
					<label htmlFor="value">Value:</label>
					<select id="value" onChange={handleFilterSelection}>
						<option value="">Select a value</option>
						{sortableColumnValues.find(value => value.value === selectedFilter)?.values.map((value, index) => (
							<option key={index} value={value}>{value}</option>
						))}
					</select>
				</div>
			)}
		</div>
	);
};
