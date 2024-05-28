import { screen } from '@testing-library/react';
// @ts-ignore
import { renderWithDeps } from '../../test/utils';
import { TemplateName } from './TemplateName';

describe('<TemplateName />', () => {
	it('renders', () => {
		renderWithDeps(<TemplateName />);

		const templateName = screen.getByTestId('TemplateName');

		// @ts-ignore
		expect(templateName).toBeVisible();
	});
});
