import React, { Component } from 'react';
import { matchSingleRoute } from './matchRoute';
import { Context } from './Context';

export class Fragment extends Component {
	renderChildren({ currentLocation }) {
		const { forRoute, children } = this.props;
		const { pathname } = currentLocation;

		const route = matchSingleRoute(forRoute, pathname);

		if (!route) {
			return null;
		}

		const childrenIsReactElement =
			children &&
			children.type &&
			typeof children.type === 'function' &&
			children.$$typeof &&
			children.$$typeof === Symbol.for('react.element');

		const childrenWithParams = childrenIsReactElement
			? React.cloneElement(children, { params: route.params })
			: children;

		return React.Children.only(childrenWithParams);
	}
	render() {
		return <Context.Consumer>{this.renderChildren}</Context.Consumer>;
	}
}
