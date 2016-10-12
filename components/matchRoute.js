import Route from 'route-parser';

import type { $FormattedRoutes } from './formatRoutes';

type $MatchedRoute = {
	route: Object,
	routeParams: Object,
	component: ReactClass<*>,
};

const matchRoute = (routes: $FormattedRoutes, pathname: string): false | $MatchedRoute => {
	const foundRoute = routes.find(({ route }) => {
		return route.match(pathname);
	});

	return foundRoute
		? Object.assign({}, foundRoute, { routeParams: foundRoute.route.match(pathname) })
		: false;
};

export default matchRoute;

export const matchSingleRoute = (route: string, pathname: string): boolean | Object => {
	const routeMatcher = new Route(route);
	const matched = routeMatcher.match(pathname);

	return matched ? { routeParams: matched } : false;
};
