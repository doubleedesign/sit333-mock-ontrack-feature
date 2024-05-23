import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { DiProvider, injectable } from 'react-magnetic-di';

const commonDeps: ReturnType<typeof injectable>[] = [];

export const renderWithDeps = (component: ReactNode) => {
	return render(
		<DiProvider use={commonDeps}>
			{component}
		</DiProvider>);
};