// @flow

import React from 'react';

import type { $Location } from './Router';

type $Props = {
	forRoute: string,
	children?: React$Element<*>,
}

type $Context = {
	getLocation: () => $Location,
}

const Fragment = (props: $Props, context: $Context) => {
	const location = context.getLocation();
	const { forRoute, children } = props;

	if (location.pathname !== forRoute) {
		return null;
	}

	return React.Children.only(children);
};
Fragment.contextTypes = { getLocation: React.PropTypes.func };

export default Fragment;
