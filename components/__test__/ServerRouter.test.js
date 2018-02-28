import React from 'react';
import { render, shallow } from 'enzyme';

import { matchRoute } from '../matchRoute';
import { ServerRouter } from '../ServerRouter';
import { RouterMountpoint } from '../RouterMountpoint';

describe('<ServerRouter />', () => {
	const NotFound = () => <h1>Not Found</h1>;
	const Page = () => <h1>Page</h1>;
	const routeConfig = {
		routes: {
			'/': { component: Page },
		},
		miss: NotFound,
	};

	it('renders a page when the route matches', () => {
		const location = '/';
		const matchedRoute = matchRoute(routeConfig, location);

		const result = render(
			<ServerRouter matchedRoute={matchedRoute} location={location}>
				<RouterMountpoint />
			</ServerRouter>,
		);

		expect(result.text()).toEqual('Page');
	});

	it('renders a miss page when the route does not match', () => {
		const location = '/not-matching';
		const matchedRoute = matchRoute(routeConfig, location);

		const result = render(
			<ServerRouter matchedRoute={matchedRoute} location={location}>
				<RouterMountpoint />
			</ServerRouter>,
		);

		expect(result.text()).toEqual('Not Found');
	});

	it('supplies the proper location in context', () => {
		const location = '/another-page?search#hash';
		const matchedRoute = matchRoute(routeConfig, location);

		const wrapper = shallow(
			<ServerRouter matchedRoute={matchedRoute} location={location} />,
		);

		const childContext = wrapper.instance().getChildContext();

		const expectedLocation = {
			hash: '#hash',
			pathname: '/another-page',
			search: '?search',
			state: undefined,
		};

		expect(childContext.getCurrentLocation()).toMatchObject(expectedLocation);
	});

	it('supplies the proper routes in context', () => {
		const location = '/';
		const matchedRoute = matchRoute(routeConfig, location);

		const wrapper = shallow(
			<ServerRouter
				routeConfig={routeConfig}
				matchedRoute={matchedRoute}
				location={location}
			/>,
		);

		const childContext = wrapper.instance().getChildContext();

		const expectedRoutes = {
			'/': {
				component: Page,
			},
		};

		expect(childContext.getRoutes()).toMatchObject(expectedRoutes);
	});
});
