import React from 'react';
import { render, shallow } from 'enzyme';

import { Fragment } from '../Fragment';
import { Context } from '../Context';

describe('<Fragment />', () => {
	const location = (pathname) => ({
		currentLocation: { pathname },
	});

	it('renders when the route matches', () => {
		const result = shallow(
			<Context.Provider value={location('/page')}>
				<Fragment forRoute="/page">
					<h1>Text</h1>
				</Fragment>
			</Context.Provider>,
		);

		expect(result.contains(<h1>Text</h1>)).toBe(true);
		expect(result).toMatchSnapshot();
	});

	it('does not render when the route does not match', () => {
		const result = render(
			<Context.Provider value={location('/page')}>
				<Fragment forRoute="/another-page">
					<h1>Text</h1>
				</Fragment>
			</Context.Provider>,
		);

		expect(result.find('h1')).toHaveLength(0);
		expect(result).toMatchSnapshot();
	});

	it('passes route params as props', () => {
		const PropPrinter = ({ params }) => <p>{JSON.stringify(params)}</p>;
		const result = render(
			<Fragment forRoute="/:name">
				<PropPrinter />
			</Fragment>,
			{ context: location('/a-name') },
		)
			.first()
			.shallow(); // Render <PropPrinter /> as well

		expect(result.text()).toEqual(JSON.stringify({ name: 'a-name' }));
	});
});
