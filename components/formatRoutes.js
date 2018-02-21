import Route from 'route-parser';

export const formatRoutes = (routes) =>
	Object.keys(routes).map((key) => {
		const route = routes[key];
		return formatRoute(key, route);
	});

export const formatRoute = (key, route) => ({
	route: new Route(key),
	...route,
});
