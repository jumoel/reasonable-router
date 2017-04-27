import React from 'react';

import formatRoutes from '../formatRoutes';

describe('formatRoutes', () => {
	it('returns an array', () => {
		const result = formatRoutes({});

		expect(Array.isArray(result)).toBe(true);
	});

	it('creates a `route` and `component` prop', () => {
		const Component = () => <h1>Component</h1>;
		const routes = {
			'/': { component: Component },
		};

		const result = formatRoutes(routes);

		expect(result.length).toBe(1);
		expect(result[0].component).toBeDefined();
		expect(result[0].route).toBeDefined();
	});

	it('creates a `name` prop if supplied', () => {
		const Component = () => <h1>Component</h1>;
		const routesWithoutName = {
			'/': { component: Component },
		};

		const routesWithName = {
			'/': { component: Component, name: 'Name' },
		};

		const resultWithoutName = formatRoutes(routesWithoutName);
		const resultWithName = formatRoutes(routesWithName);

		expect(resultWithoutName[0].name).toBeUndefined();
		expect(resultWithName[0].name).toBeDefined();
		expect(resultWithName[0].name).toEqual('Name');
	});
});
