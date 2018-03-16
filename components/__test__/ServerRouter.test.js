import React from 'react';
import { render, shallow, mount } from 'enzyme';

import { matchRoute } from '../matchRoute';
import { ServerRouter } from '../ServerRouter';
import { RouterMountpoint } from '../RouterMountpoint';
import { Context } from '../Context';

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
			<ServerRouter
				matchedRoute={matchedRoute}
				routeConfig={routeConfig}
				location={location}
			>
				<RouterMountpoint />
			</ServerRouter>,
		);

		expect(result.text()).toEqual('Page');
	});

	it('renders a miss page when the route does not match', () => {
		const location = '/not-matching';
		const matchedRoute = matchRoute(routeConfig, location);

		const result = render(
			<ServerRouter
				matchedRoute={matchedRoute}
				routeConfig={routeConfig}
				location={location}
			>
				<RouterMountpoint />
			</ServerRouter>,
		);

		expect(result.text()).toEqual('Not Found');
	});

	describe('context', () => {
		const location = '/another-page?search#hash';
		const matchedRoute = matchRoute(routeConfig, location);

		const ContextGrabber = () => null;

		const wrapper = mount(
			<ServerRouter
				matchedRoute={matchedRoute}
				routeConfig={routeConfig}
				location={location}
			>
				<Context.Consumer>
					{(context) => <ContextGrabber context={context} />}
				</Context.Consumer>
			</ServerRouter>,
		);

		const { context } = wrapper.find(ContextGrabber).props();

		it('supplies the proper location', () => {
			const expectedLocation = {
				hash: '#hash',
				pathname: '/another-page',
				search: '?search',
			};

			expect(context.currentLocation).toMatchObject(expectedLocation);
		});

		it('supplies the proper routes in context', () => {
			const expectedRoutes = {
				'/': {
					component: Page,
				},
			};

			expect(context.routes).toMatchObject(expectedRoutes);
		});
	});
});
