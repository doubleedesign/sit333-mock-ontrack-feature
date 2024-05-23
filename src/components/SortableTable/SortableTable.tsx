import { FC } from 'react';
import { TaskTableRow } from '../../types.ts';

type SortableTableProps = {
	data: TaskTableRow[];
}

export const SortableTable: FC<SortableTableProps> = ({ data }) => {
	// TODO: Sorting and filtering functions


	return (
		<table>
		</table>
	);
};
