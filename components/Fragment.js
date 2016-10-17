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

	const route = matchSingleRoute(forRoute, getCurrentLocation().pathname);

	if (!route) {
		return null;
	}

	const childrenIsReactElement =
		children &&
		children.type && typeof children.type === 'function' &&
		children.$$typeof && children.$$typeof === Symbol.for('react.element');

	const childrenWithParams = childrenIsReactElement
		? React.cloneElement(children, { params: route.params } )
		: children;

	return React.Children.only(childrenWithParams);
};
Fragment.contextTypes = {
	getCurrentLocation: PropTypes.func,
};

export default Fragment;
