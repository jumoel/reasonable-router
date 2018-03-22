import React from 'react';
import { render, mount } from 'enzyme';

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
			'/redirect': { redirectTo: '/' },
		},
		miss: NotFound,
	};

	const history = (page) => createMemoryHistory({ initialEntries: [page] });
	fit;
	it('renders a page when the route matches', () => {
		const result = mount(
			<BrowserRouter routeConfig={routeConfig} history={history('/')}>
				<RouterMountpoint />
			</BrowserRouter>,
		);

		expect(result.text()).toEqual('Page');
	});
	fit;
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
	fit;
	it('renders a the proper page when a redirect is encountered', () => {
		const renderWithHistory = (hist) =>
			render(
				<BrowserRouter routeConfig={routeConfig} history={hist}>
					<RouterMountpoint />
				</BrowserRouter>,
			);

		const hist = history('/redirect');

		expect(renderWithHistory(hist).text()).toEqual('Page');
		expect(hist.location.pathname).toEqual('/');
		expect(hist.entries.length).toEqual(2);

		hist.push('/redirect');

		expect(renderWithHistory(hist).text()).toEqual('Page');
		expect(hist.location.pathname).toEqual('/');
		expect(hist.entries.length).toEqual(4);
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
	fit;
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
	fit;
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
		const ContextGrabber = () => null;
		let hist, wrapper, context;

		beforeEach(() => {
			hist = history('/another-page');

			wrapper = mount(
				<BrowserRouter routeConfig={routeConfig} history={hist}>
					<Context.Consumer>
						{(context) => <ContextGrabber context={context} />}
					</Context.Consumer>
				</BrowserRouter>,
			);

			context = wrapper.find(ContextGrabber).props().context;
		});
		fit;
		it('supplies the proper location', () => {
			const expectedLocation = {
				hash: '',
				pathname: '/another-page',
				search: '',
				state: undefined,
			};

			expect(context.currentLocation).toMatchObject(expectedLocation);
		});
		fit;
		it('supplies the proper routes', () => {
			expect(context.routes).toEqual(routeConfig.routes);
		});
		fit;
		it('supplies the proper push function', () => {
			const { push } = context;
			push('/a-new-page');

			expect(typeof push).toEqual('function');
			expect(hist.location.pathname).toEqual('/a-new-page');
		});
	});
});
