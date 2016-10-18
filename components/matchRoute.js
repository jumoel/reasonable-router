import Route from 'route-parser';
import formatRoutes from './formatRoutes';

import type { $RouteConfig } from './Router';

type $MatchedRoute = {|
	params: Object,
	component: ReactClass<*>,
	route?: Object,
	isMiss?: boolean,
|};

const matchRoute = (routeConfig: $RouteConfig, pathname: string): $MatchedRoute => {
	const formattedRoutes = formatRoutes(routeConfig.routes);

	const foundRoute = formattedRoutes.find(({ route }) => {
		return route.match(pathname);
	});

	return foundRoute
		? Object.assign({}, foundRoute, { params: foundRoute.route.match(pathname) })
		: { component: routeConfig.miss, params: {}, isMiss: true };
};

export default matchRoute;

export const matchSingleRoute = (route: string, pathname: string): boolean | {| params: Object |} => {
	const routeMatcher = new Route(route);
	const matched: Object = routeMatcher.match(pathname);

	return matched ? { params: matched } : false;
};
