import Route from 'route-parser';

const formatRoutes = (routes) => {
	return Object.keys(routes).map((key) => {
		const route = routes[key];
		return formatRoute(key, route);
	});
};

export const formatRoute = (key, route) => ({
	route: new Route(key),
	...route,
});

export default formatRoutes;
