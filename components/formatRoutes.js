import pathToRegexp from 'path-to-regexp';

export class Route {
	constructor(spec) {
		this.keys = [];
		this.re = pathToRegexp(spec, this.keys);
		this.pathBuilder = pathToRegexp.compile(spec);
	}

	matches(pathname) {
		return this.re.test(pathname);
	}

	reverse(params) {
		return this.pathBuilder(params);
	}

	params(pathname) {
		const results = this.re.exec(pathname);

		return results
			.slice(1)
			.reduce(
				(acc, val, index) =>
					Object.assign(acc, { [this.keys[index].name]: val }),
				{},
			);
	}
}

export const formatRoutes = (routes) =>
	Object.keys(routes).map((key) => {
		const routeParams = routes[key];
		return formatRoute(key, routeParams);
	});

export const formatRoute = (key, routeParams = {}) => ({
	route: new Route(key),
	...routeParams,
});
