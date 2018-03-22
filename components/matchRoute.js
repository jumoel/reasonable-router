import { formatRoutes, Route } from './formatRoutes';

export const matchRoute = (routeConfig, pathname) => {
	const formattedRoutes = formatRoutes(routeConfig.routes);

	let visited = [];
	let finalRoute = null;
	let currentPath = pathname;
	let isMiss = false;
	let isRedirect = false;

	while (finalRoute === null && isMiss === false) {
		if (visited.includes(currentPath)) {
			throw new Error(
				'Circular redirect detected: ' +
					visited.concat([currentPath]).join(', '),
			);
		}

		visited.push(currentPath);

		const foundRoute = formattedRoutes.find(({ route }) =>
			route.matches(currentPath),
		);

		if (foundRoute && foundRoute.hasOwnProperty('redirectTo')) {
			currentPath = foundRoute.redirectTo;
			isRedirect = true;
		} else if (foundRoute) {
			finalRoute = foundRoute;
		} else {
			isMiss = true;
		}
	}

	return isMiss
		? { component: routeConfig.miss, params: {}, isMiss, isRedirect }
		: {
				...finalRoute,
				pathname: currentPath,
				params: finalRoute.route.matches(currentPath),
				isMiss,
				isRedirect,
		  };
};

export const matchSingleRoute = (routeSpec, pathname) => {
	const route = new Route(routeSpec);
	const matches = route.matches(pathname);

	return matches ? { params: route.params(pathname) } : false;
};
