import Route from 'route-parser';

type $RouteParser = { match: Function, reverse: Function };
export type $FormattedRoutes = [
	{ route: $RouteParser, component: ReactClass }
];

const formatRoutes = (routes): $FormattedRoutes => {
	return Object.keys(routes).map(key => {
		const route = routes[key];
		return { route: new Route(key), component: route.component };
	});
};

export default formatRoutes;
