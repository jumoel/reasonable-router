// @flow

import React, { PropTypes } from 'react';
import { matchSingleRoute } from './matchRoute';

import type { $Location } from './Router';

type $Props = {
	forRoute: string,
	children: React$Element<*>,
}

type $Context = {
	getCurrentLocation: () => $Location,
}

const Fragment = (props: $Props, context: $Context) => {
	const { getCurrentLocation } = context;
	const { forRoute, children } = props;

	const routeMatches = matchSingleRoute(forRoute, getCurrentLocation().pathname);

	if (!routeMatches) {
		return null;
	}

	const childrenIsReactElement =
		children &&
		children.type && typeof children.type === 'function' &&
		children.$$typeof && children.$$typeof === Symbol.for('react.element');

	const childrenWithParams = childrenIsReactElement
		? React.cloneElement(children, { routeParams: routeMatches.routeParams } )
		: children;

	return React.Children.only(childrenWithParams);
};
Fragment.contextTypes = {
	getCurrentLocation: PropTypes.func,
};

export default Fragment;
