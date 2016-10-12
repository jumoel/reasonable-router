import Route from 'route-parser';

import type { $FormattedRoutes } from './formatRoutes';

const matchRoute = (routes: $FormattedRoutes, pathname: string): boolean | Object => {
	const foundRoute = routes.find(({ route }) => {
		return route.match(pathname);
	});

	return foundRoute
		? Object.assign({}, foundRoute, { params: foundRoute.route.match(pathname) })
		: false;
};

export default matchRoute;

export const matchSingleRoute = (route: string, pathname: string): boolean | Object => {
	const routeMatcher = new Route(route);
	const matched = routeMatcher.match(pathname);

	return matched ? { params: matched } : false;
};
