import React from 'react';
import { render, shallow, mount } from 'enzyme';

import { createMemoryHistory } from 'history';

import { BrowserRouter } from '../BrowserRouter';
import { RouterMountpoint } from '../RouterMountpoint';
import { Context } from '../Context';

describe('<BrowserRouter />', () => {
	const NotFound = () => <h1>Not Found</h1>;
	const Page = () => <h1>Page</h1>;
	const routeConfig = {
		routes: {
			'/': { component: Page },
		},
		miss: NotFound,
	};

	const history = (page) => createMemoryHistory({ initialEntries: [page] });

	it('renders a page when the route matches', () => {
		const result = mount(
			<BrowserRouter routeConfig={routeConfig} history={history('/')}>
				<RouterMountpoint />
			</BrowserRouter>,
		);

		expect(result.text()).toEqual('Page');
	});

	it('renders a miss page when the route does not match', () => {
		const result = render(
			<BrowserRouter
				routeConfig={routeConfig}
				history={history('/another-page')}
			>
				<RouterMountpoint />
			</BrowserRouter>,
		);

		expect(result.text()).toEqual('Not Found');
	});

	it('calls the `onMiss` callback when the route does not match', () => {
		const onMiss = jest.fn();

		render(
			<BrowserRouter
				routeConfig={routeConfig}
				history={history('/another-page')}
				onMiss={onMiss}
			>
				<RouterMountpoint />
			</BrowserRouter>,
		);

		expect(onMiss).toBeCalled();
	});

	it('renders a new page when the route changes', () => {
		const hist = history('/another-page');

		const before = render(
			<BrowserRouter routeConfig={routeConfig} history={hist}>
				<RouterMountpoint />
			</BrowserRouter>,
		);

		expect(before.text()).toEqual('Not Found');

		hist.push('/');

		const after = render(
			<BrowserRouter routeConfig={routeConfig} history={hist}>
				<RouterMountpoint />
			</BrowserRouter>,
		);
		expect(after.text()).toEqual('Page');
	});

	it('calls the `onChange` callback when the route changes', () => {
		const hist = history('/another-page');
		const onChange = jest.fn();

		render(
			<BrowserRouter
				routeConfig={routeConfig}
				history={hist}
				onChange={onChange}
			>
				<RouterMountpoint />
			</BrowserRouter>,
		);

		hist.push('/');
		expect(onChange).toBeCalled();
	});

	describe('context', () => {
		const hist = history('/another-page');

		const ContextGrabber = () => null;

		const wrapper = mount(
			<BrowserRouter routeConfig={routeConfig} history={hist}>
				<Context.Consumer>
					{(context) => <ContextGrabber context={context} />}
				</Context.Consumer>
			</BrowserRouter>,
		);

		const { context } = wrapper.find(ContextGrabber).props();

		it('supplies the proper location', () => {
			const expectedLocation = {
				hash: '',
				pathname: '/another-page',
				search: '',
				state: undefined,
			};

			expect(context.currentLocation).toMatchObject(expectedLocation);
		});

		it('supplies the proper routes', () => {
			expect(context.routes).toEqual(routeConfig.routes);
		});

		it('supplies the proper push function', () => {
			const { push } = context;
			push('/a-new-page');

			expect(typeof push).toEqual('function');
			expect(hist.location.pathname).toEqual('/a-new-page');
		});
	});
});
