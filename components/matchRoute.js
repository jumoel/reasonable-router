import Route from 'route-parser';
import formatRoutes from './formatRoutes';

import type { $RouteConfig } from './Router';

type $MatchedRoute = {|
	route?: Object,
	routeParams: Object,
	component: ReactClass<*>,
	isMiss?: boolean,
|};

const matchRoute = (routeConfig: $RouteConfig, pathname: string): $MatchedRoute => {
	const formattedRoutes = formatRoutes(routeConfig.routes);

	const foundRoute = formattedRoutes.find(({ route }) => {
		return route.match(pathname);
	});

	return foundRoute
		? Object.assign({}, foundRoute, { routeParams: foundRoute.route.match(pathname) })
		: { component: routeConfig.miss, routeParams: {}, isMiss: true };
};

export default matchRoute;

export const matchSingleRoute = (route: string, pathname: string): boolean | Object => {
	const routeMatcher = new Route(route);
	const matched = routeMatcher.match(pathname);

	return matched ? { routeParams: matched } : false;
};
