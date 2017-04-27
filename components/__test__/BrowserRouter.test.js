import React from 'react';
import { shallow } from 'enzyme';

import BrowserRouter from '../BrowserRouter';
import Router from '../Router';

describe('<BrowserRouter />', () => {
	const NotFound = () => <h1>Not Found</h1>;
	const Page = () => <h1>Page</h1>;
	const routeConfig = {
		routes: {
			'/': { component: Page },
		},
		miss: NotFound,
	};
	const location = '/?search#hash';

	it('renders a <Route /> component', () => {
		const result = shallow(
			<BrowserRouter location={location} routeConfig={routeConfig} />,
		);

		expect(result.type()).toEqual(Router);
	});

	it('passes along the routeConfig object', () => {
		const result = shallow(<BrowserRouter routeConfig={routeConfig} />);

		expect(result.node.props.routeConfig).toEqual(routeConfig);
	});
});
