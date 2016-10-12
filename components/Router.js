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

export default class Router extends Component {
	props: $Props;

	state: $State;

	_historyUnlistener: () => void;
	renderComponent: null | ReactClass<*>;

	constructor(props: $Props) {
		super(props);

		this._historyUnlistener = props.history.listen(this.historyListener.bind(this));
		this.renderComponent = null;

		this.state = {
			routes: formatRoutes(props.routes),
			currentLocation: props.history.location,
		};
	}

	static childContextTypes = {
		push: React.PropTypes.func,
		getRouterRenderComponent: React.PropTypes.func,
		getCurrentLocation: React.PropTypes.func,
	}

	getChildContext() {
		return {
			push: (path: string, state: Object = {}): void => this.props.history.push(path, state),
			getRouterRenderComponent: (): null | ReactClass<*> => this.renderComponent,
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
		const { miss } = this.props;
		const { pathname } = this.state.currentLocation;

		const foundRoute = matchRoute(this.state.routes, pathname);

		this.renderComponent = foundRoute ? foundRoute.component : miss;

		if (!foundRoute && this.props.onMiss) {
			this.props.onMiss();
		}

		return React.Children.only(this.props.children);
	}
}
