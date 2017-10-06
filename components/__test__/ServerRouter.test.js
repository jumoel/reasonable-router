import React from 'react';
import { shallow } from 'enzyme';

import ServerRouter from '../ServerRouter';
import Router from '../Router';

describe('<ServerRouter />', () => {
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
			<ServerRouter location={location} routeConfig={routeConfig} />,
		);

		expect(result.type()).toEqual(Router);
	});

	it('passes along the routeConfig object', () => {
		const result = shallow(
			<ServerRouter location={location} routeConfig={routeConfig} />,
		);

		expect(result.getElement().props.routeConfig).toEqual(routeConfig);
	});

	it('does not pass on the location property', () => {
		const result = shallow(
			<ServerRouter location={location} routeConfig={routeConfig} />,
		);

		expect(result.getElement().props.location).toBeUndefined();
	});

	it('wraps the location in an history object', () => {
		const result = shallow(
			<ServerRouter location={location} routeConfig={routeConfig} />,
		);

		expect(result.getElement().props.history).toBeDefined();
		expect(result.getElement().props.history.location).toBeDefined();
		expect(result.getElement().props.history.location.pathname).toEqual('/');
		expect(result.getElement().props.history.location.search).toEqual(
			'?search',
		);
		expect(result.getElement().props.history.location.hash).toEqual('#hash');
	});
});
