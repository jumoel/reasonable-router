import React from 'react';
import PropTypes from 'prop-types';
import { matchSingleRoute } from './matchRoute';


const Fragment = (props, context) => {
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
