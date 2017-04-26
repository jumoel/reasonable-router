// @flow

import Route from 'route-parser';

import type { $Routes, $Route } from './Router';
type $RouteParser = { match: Function, reverse: Function };
type $FormattedRoute = {| route: $RouteParser |} & $Route;
export type $FormattedRoutes = [ $FormattedRoute ];

const formatRoutes = (routes: $Routes): $FormattedRoutes => {
	return Object.keys(routes).map(key => {
		const route: $Route = routes[key];
		return formatRoute(key, route);
	});
};

export const formatRoute = (key: string, route: $Route): $FormattedRoute => (
	{ route: new Route(key), ...route }
);

export default formatRoutes;
