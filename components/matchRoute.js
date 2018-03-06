import { formatRoute, formatRoutes, Route } from './formatRoutes';

export const matchRoute = (routeConfig, pathname) => {
	const formattedRoutes = formatRoutes(routeConfig.routes);

	const foundRoute = formattedRoutes.find(({ route }) =>
		route.matches(pathname),
	);

	return foundRoute
		? { ...foundRoute, params: foundRoute.route.matches(pathname) }
		: { component: routeConfig.miss, params: {}, isMiss: true };
};

export const matchSingleRoute = (routeSpec, pathname) => {
	const route = new Route(routeSpec);
	const matched = route.matches(pathname);

	return matched ? { params: route.params(pathname) } : false;
};
