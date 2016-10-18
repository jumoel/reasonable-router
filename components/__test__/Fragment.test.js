import React from 'react';
import { shallow } from 'enzyme';

import Fragment from '../Fragment';

describe('<Fragment />', () => {
	const location = (pathname) => ({
		getCurrentLocation: () => ({ pathname }),
	});

	it('renders when the route matches', () => {
		const result = shallow(
			<Fragment forRoute='/page'><h1>Text</h1></Fragment>,
			{ context: location('/page') }
		);

		expect(result.text()).toEqual('Text');
	});

	it('does not render when the route does not match', () => {
		const result = shallow(
			<Fragment forRoute='/another-page'><h1>Text</h1></Fragment>,
			{ context: location('/page') }
		);

		expect(result.type()).toEqual(null);
	});

	it('passes route params as props', () => {
		const PropPrinter = ({ params }) => <p>{ JSON.stringify(params) }</p>;
		const result = shallow(
			<Fragment forRoute='/:name'><PropPrinter /></Fragment>,
			{ context: location('/a-name') }
		).first().shallow(); // Render <PropPrinter /> as well

		expect(result.text()).toEqual(JSON.stringify({ name: 'a-name' }));
	});
});
