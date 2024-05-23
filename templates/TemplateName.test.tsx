import { screen } from '@testing-library/react';
import { renderWithDeps } from '../../test/utils';
import { TemplateName } from './TemplateName';

describe('<TemplateName />', () => {
	it('renders', () => {
		renderWithDeps(<TemplateName />);

		const templateName = screen.getByTestId('TemplateName');

		expect(templateName).toBeVisible();
	});
});
