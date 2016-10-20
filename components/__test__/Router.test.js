import React from 'react';
import { render } from 'enzyme';

import { createMemoryHistory } from 'history';

import Router from '../Router';
import RouterMountpoint from '../RouterMountpoint';

describe('<Router />', () => {
	const NotFound = () => <h1>Not Found</h1>;
	const Page = () => <h1>Page</h1>;
	const routeConfig = {
		routes: {
			'/': { component: Page },
		},
		miss: NotFound,
	};

	const history = (page) => createMemoryHistory({ initialEntries: [ page ]});

	it('renders a page when the route matches', () => {
		const result = render(
			<Router routeConfig={routeConfig} history={history('/')}>
				<RouterMountpoint />
			</Router>
		);

		expect(result.text()).toEqual('Page');
	});

	it('renders a miss page when the route does not match', () => {
		const result = render(
			<Router routeConfig={routeConfig} history={history('/another-page')}>
				<RouterMountpoint />
			</Router>
		);

		expect(result.text()).toEqual('Not Found');
	});

	it('calls the `onMiss` callback when the route does not match', () => {
		const onMiss = jest.fn();

		render(
			<Router routeConfig={routeConfig} history={history('/another-page')} onMiss={onMiss}>
				<RouterMountpoint />
			</Router>
		);

		expect(onMiss).toBeCalled();
	});

	it('renders a new page when the route changes', () => {
		const hist = history('/another-page');

		const before = render(
			<Router routeConfig={routeConfig} history={hist}>
				<RouterMountpoint />
			</Router>
		);

		expect(before.text()).toEqual('Not Found');

		hist.push('/');

		const after = render(
			<Router routeConfig={routeConfig} history={hist}>
				<RouterMountpoint />
			</Router>
		);
		expect(after.text()).toEqual('Page');
	});

	it('calls the `onChange` callback when the route changes', () => {
		const hist = history('/another-page');
		const onChange = jest.fn();

		render(
			<Router routeConfig={routeConfig} history={hist} onChange={onChange}>
				<RouterMountpoint />
			</Router>
		);

		hist.push('/');
		expect(onChange).toBeCalled();
	});
});
