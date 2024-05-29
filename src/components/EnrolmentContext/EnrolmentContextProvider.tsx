import { createContext, FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { onTrack } from '../../datasources/onTrack.ts';
import { TaskTableRow } from '../../types.ts';
import { datawranglers } from '../../datawranglers';

type EnrolmentContextProps = {
	projectIds: number[];
	showColumns: {
		value: string;
		label: string;
	}[];
}

type EnrolmentContextState = {
	loading: boolean;
	data: TaskTableRow[];
	columns: {
		value: string;
		label: string;
	}[];
	sortableColumns: {
		value: string;
		label: string;
	}[];
	sortableColumnValues: {
		value: string;
		values: string[];
	}[];
	filter: (field: string, value: string | number) => void;
	sort: (field: string, order: 'asc' | 'desc') => void;
}

export const EnrolmentContext = createContext({} as EnrolmentContextState);

export const EnrolmentContextProvider: FC<PropsWithChildren<EnrolmentContextProps>> = ({ projectIds, showColumns, children }) => {
	const [loading, setLoading] = useState<boolean>(true);
	// The full data set
	const [rawData, setRawData] = useState<TaskTableRow[]>([]);
	// The data set that will be displayed - can be sorted, filtered, grouped, etc.
	const [data, setData] = useState<TaskTableRow[]>([]);

	// Fetch table initialData on mount
	useEffect(() => {
		onTrack.fetchTaskRowsForProjects(projectIds).then((rows: TaskTableRow[]) => {
			setRawData(rows);
			setData(rows);
			setLoading(false);
		});
	}, [projectIds]);


	// Define sortable columns
	const columns = showColumns;
	const sortableColumns = columns.filter(column => !['due_date', 'taskName'].includes(column.value));

	// Loop through the data to get the possible values of the fields that match the sortable column names
	const sortableColumnValues = useMemo(() => {
		return sortableColumns.map(column => {
			const values = new Set<string>();
			rawData.forEach(row => {
				values.add(row[column.value]);
			});
			return { value: column.value, values: Array.from(values) };
		});
	}, [rawData, sortableColumns]);


	const filter = (field: string, value: string | number) => {
		if(field === '' || value === '') {
			setData(rawData);
		}
		else {
			setData(datawranglers.filter(rawData, field, value));
		}
	};

	const sort = (field: string, order: 'asc' | 'desc') => {
		setData(datawranglers.sort(data, field, order));
	};

	// const group = (field: string) => {
	// 	setData(datawranglers.group(data, field));
	// }

	return (
		!loading && data && <EnrolmentContext.Provider value={{ loading, data, columns, sortableColumns, sortableColumnValues, filter, sort }}>{children}</EnrolmentContext.Provider>
	);
};

