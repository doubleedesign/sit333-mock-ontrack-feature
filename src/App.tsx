
import { OverviewTable } from './components/OverviewTable/OverviewTable.tsx';
import { Unit } from './types.ts';
import { onTrack } from './datasources/onTrack.ts';
import { useEffect, useState } from 'react';

function App() {
	const [projectIds, setProjectIds] = useState<number[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchUnitIds = async () => {
		const data = await onTrack.fetchCurrentEnrolledUnits();
		return data.map((unit: Unit) => unit.id);
	};

	useEffect(() => {
		fetchUnitIds().then(result => {
			setProjectIds(result);
			setLoading(false);
		});
	}, []);

	return (
		!loading && <OverviewTable projectIds={projectIds} />
	);
}

export default App;
