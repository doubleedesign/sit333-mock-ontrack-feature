import { FC, useContext } from 'react';
import { EnrolmentContext } from '../EnrolmentContext/EnrolmentContextProvider.tsx';

export const SortableTable: FC = () => {
	// TODO: Account for loading status
	const { loading, data, columns } = useContext(EnrolmentContext);

	return (
		<table>
			<thead>
				<tr>
					{columns.map((column, index) => (
						<th key={column.value}>{column.label}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((row, rowIndex) => (
					<tr key={rowIndex}>
						{columns.map((column, columnIndex) => (
							<td key={columnIndex}>
								{row[column.value]}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};
