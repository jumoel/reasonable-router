import React from 'react';

import { matchRoute, matchSingleRoute } from '../matchRoute';

describe('matchRoute', () => {
	const Miss = () => <h1>Miss</h1>;
	Miss.displayName = 'Miss';
	const Frontpage = () => <h1>Frontpage</h1>;
	Frontpage.displayName = 'Frontpage';

	const routeConfig = {
		routes: {
			'/': { component: Frontpage, name: 'Frontpage' },
			'/redirect': { redirectTo: '/' },
		},
		miss: Miss,
	};

	it('does not modify the route config', () => {
		const routeConfigCopy = {
			routes: {
				'/': { component: Frontpage, name: 'Frontpage' },
				'/redirect': { redirectTo: '/' },
			},
			miss: Miss,
		};

		matchRoute(routeConfigCopy, '/');

		expect(routeConfigCopy).toEqual(routeConfig);
	});

	it('matches a valid route', () => {
		const route = matchRoute(routeConfig, '/');

		expect(route.name).toEqual('Frontpage');
		expect(route.component.displayName).toEqual('Frontpage');
	});

	it('does not match an invalid route', () => {
		const route = matchRoute(routeConfig, '/not-found');

		expect(route.name).toBeUndefined();
		expect(route.component.displayName).toEqual('Miss');
	});

	describe('redirects', () => {
		it('redirects properly', () => {
			const route = matchRoute(routeConfig, '/redirect');

			expect(route.name).toEqual('Frontpage');
			expect(route.component.displayName).toEqual('Frontpage');
			expect(route.isRedirect).toEqual(true);
		});

		it('throws an error on circular redirects', () => {
			let routes = {
				'/1': { redirectTo: '/2' },
				'/2': { redirectTo: '/1' },
			};

			const throws = () => {
				matchRoute({ routes }, '/1');
			};

			expect(throws).toThrow();
			expect(throws).toThrowErrorMatchingSnapshot();
		});

		it('throws an error on self-referential circular redirects', () => {
			let routes = {
				'/1': { redirectTo: '/1' },
			};

			const throws = () => {
				matchRoute({ routes }, '/1');
			};

			expect(throws).toThrow();
			expect(throws).toThrowErrorMatchingSnapshot();
		});
	});
});

describe('matchSingleRoute', () => {
	const indexRoute = '/';
	const pageRoute = '/page';

	it('matches a matching route', () => {
		const result = matchSingleRoute(indexRoute, '/');

		expect(result).toBeTruthy();
		expect(typeof result).toEqual('object');
	});

	it('does not match a not-matching route', () => {
		const result = matchSingleRoute(pageRoute, '/another-page');

		expect(result).toEqual(false);
	});

	it('does not match a subpage', () => {
		const result = matchSingleRoute(indexRoute, '/subpage');

		expect(result).toEqual(false);
	});

	it('does not match a parent page', () => {
		const result = matchSingleRoute(pageRoute, '/');

		expect(result).toEqual(false);
	});
});
