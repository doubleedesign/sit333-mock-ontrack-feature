import { EnrolmentContextProvider } from './components/EnrolmentContext/EnrolmentContextProvider.tsx';
import { UnitEnrolment } from './types.ts';
import { onTrack } from './datasources/onTrack.ts';
import { useEffect, useState } from 'react';
import { SortableTable } from './components/SortableTable/SortableTable.tsx';
import { FilterBar } from './components/FilterBar/FilterBar.tsx';

function App() {
	const [projectIds, setProjectIds] = useState<number[]>([]);
	const selectedColumns = [
		{ value: 'unitCode', label: 'Unit Code' },
		{ value: 'unitName', label: 'Unit Name' },
		{ value: 'taskName', label: 'Task Name' },
		{ value: 'taskTargetGrade', label: 'Target Grade' },
		{ value: 'status', label: 'Status' },
		{ value: 'due_date', label: 'Due Date' }
	];

	const fetchUnitIds = async () => {
		const data = await onTrack.fetchCurrentEnrolments();
		return data.map((enrolment: UnitEnrolment) => enrolment.id);
	};

	useEffect(() => {
		fetchUnitIds().then(result => {
			setProjectIds(result);
		});
	}, []);

	return (
		<EnrolmentContextProvider projectIds={projectIds} showColumns={selectedColumns}>
			<FilterBar />
			<SortableTable />
		</EnrolmentContextProvider>
	);
}

export default App;
