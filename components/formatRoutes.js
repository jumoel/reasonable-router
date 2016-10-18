import Route from 'route-parser';

import type { $Routes, $Route } from './Router';
type $RouteParser = { match: Function, reverse: Function };
export type $FormattedRoutes = [
	{ route: $RouteParser } & $Route
];

const formatRoutes = (routes: $Routes): $FormattedRoutes => {
	return Object.keys(routes).map(key => {
		const route: $Route = routes[key];
		return { route: new Route(key), ...route };
	});
};

export default formatRoutes;
