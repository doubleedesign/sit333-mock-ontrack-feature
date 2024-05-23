import { FC, useEffect, useState } from 'react';
import { onTrack } from '../../datasources/onTrack.ts';
import { TaskTableRow } from '../../types.ts';
import { SortableTable } from '../SortableTable/SortableTable.tsx';

type OverviewTableProps = {
	projectIds: number[];
}

export const OverviewTable: FC<OverviewTableProps> = ({ projectIds }) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [data, setData] = useState<TaskTableRow[]>([]);

	useEffect(() => {
		const fetchRows: () => Promise<TaskTableRow[][]> = async () => {
			return await Promise.all(projectIds.map(async (projectId) => {
				return await onTrack.fetchTaskParticipationForUnitWithDetails(projectId);
			}));
		};

		fetchRows().then((rows: TaskTableRow[][]) => {
			setData(rows.flat());
			setLoading(false);
		});
	}, [projectIds]);

	useEffect(() => {
		console.log(data);
	}, [data]);

	return (
		!loading && data && <SortableTable data={data} />
	);
};

