import Route from 'route-parser';
import { formatRoutes } from './formatRoutes';

export const matchRoute = (routeConfig, pathname) => {
	const formattedRoutes = formatRoutes(routeConfig.routes);

	const foundRoute = formattedRoutes.find(({ route }) => route.match(pathname));

	return foundRoute
		? { ...foundRoute, params: foundRoute.route.match(pathname) }
		: { component: routeConfig.miss, params: {}, isMiss: true };
};

export const matchSingleRoute = (route, pathname) => {
	const routeMatcher = new Route(route);
	const matched = routeMatcher.match(pathname);

	return matched ? { params: matched } : false;
};
