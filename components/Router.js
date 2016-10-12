// @flow

import React, { Component } from 'react';

import formatRoutes from './formatRoutes';
import matchRoute from './matchRoute';

import type { $FormattedRoutes } from './formatRoutes';

export type $Routes = { [key: string]: { component: ReactClass<*> }};
export type $Location = Object;
export type $History = Object;

type $Props = {
	history: $History,
	onChange?: (location: $Location) => void,
	onMiss?: () => void,
	routes: $Routes,
	miss: ReactClass<*>,
	children?: React$Element<*>,
};

type $State = {
	routes: $FormattedRoutes,
	currentLocation: $Location,
};

type $RouterRenderProps = {
	params: Object,
	Component: null | ReactClass<*>,
}

export default class Router extends Component {
	props: $Props;

	state: $State;

	_historyUnlistener: () => void;
	mountPointComponent: null | ReactClass<*>;
	mountPointParams: Object;

	constructor(props: $Props) {
		super(props);

		this._historyUnlistener = props.history.listen(this.historyListener.bind(this));
		this.mountPointComponent = null;
		this.mountPointParams = {};

		this.state = {
			routes: formatRoutes(props.routes),
			currentLocation: props.history.location,
		};
	}

	static childContextTypes = {
		push: React.PropTypes.func,
		getRouterRenderProperties: React.PropTypes.func,
		getCurrentLocation: React.PropTypes.func,
	}

	getRouterRenderProperties(): $RouterRenderProps {
		return {
			params: this.mountPointParams,
			Component: this.mountPointComponent,
		};
	}

	getChildContext() {
		return {
			push: (path: string, state: Object = {}): void => this.props.history.push(path, state),
			getRouterRenderProperties: this.getRouterRenderProperties.bind(this),
			getCurrentLocation: () => this.state.currentLocation,
		};
	}

	historyListener(location: $Location) {
		if (this.props.onChange) {
			this.props.onChange(location);
		}

		this.setState({ currentLocation: location });
	}

	componentWillReceiveProps(nextProps: $Props) {
		this.setState({ routes: formatRoutes(nextProps.routes) });
	}

	componentWillUnmount() {
		if (this._historyUnlistener) {
			this._historyUnlistener();
		}
	}

	render() {
		const { miss, children, onMiss } = this.props;
		const { pathname } = this.state.currentLocation;

		const foundRoute = matchRoute(this.state.routes, pathname);

		this.mountPointComponent = foundRoute ? foundRoute.component : miss;
		this.mountPointParams = foundRoute ? foundRoute.routeParams : {};

		if (!foundRoute && onMiss) {
			onMiss();
		}

		return React.Children.only(children);
	}
}
