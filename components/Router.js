// @flow

import React, { Component } from 'react';

import matchRoute from './matchRoute';

export type $Route = {| component: ReactClass<*>, name?: string |};
export type $Routes = { [key: string]: $Route };
export type $RouteConfig = {|
	miss: ReactClass<*>,
	routes: $Routes,
|};
export type $Location = Object;
export type $History = Object;

type Props = {
	history: $History,
	onChange?: (location: $Location) => void,
	onMiss?: () => void,
	routeConfig: $RouteConfig,
	children?: React$Element<*>,
};

type State = {
	currentLocation: $Location,
};

type $RouterRenderProps = {
	params: Object,
	Component: null | ReactClass<*>,
}

export default class Router extends Component {
	props: Props;

	state: State;

	_historyUnlistener: () => void;
	mountPointComponent: null | ReactClass<*>;
	mountPointParams: Object;

	constructor(props: Props) {
		super(...arguments);

		this._historyUnlistener = props.history.listen(this.historyListener.bind(this));
		this.mountPointComponent = null;
		this.mountPointParams = {};

		this.state = {
			currentLocation: props.history.location,
		};
	}

	static childContextTypes = {
		push: React.PropTypes.func,
		getRouterRenderProperties: React.PropTypes.func,
		getCurrentLocation: React.PropTypes.func,
		getRoutes: React.PropTypes.func,
	}

	getRouterRenderProperties(): $RouterRenderProps {
		return {
			params: this.mountPointParams,
			Component: this.mountPointComponent,
		};
	}

	getRoutes(): $Routes {
		return this.props.routeConfig.routes;
	}

	getChildContext() {
		return {
			push: (path: string, state: Object = {}): void => this.props.history.push(path, state),
			getRouterRenderProperties: this.getRouterRenderProperties.bind(this),
			getCurrentLocation: () => this.state.currentLocation,
			getRoutes: this.getRoutes.bind(this),
		};
	}

	historyListener(location: $Location) {
		if (this.props.onChange) {
			this.props.onChange(location);
		}

		if (process.env.BROWSER) {
			this.setState({ currentLocation: location });
		}
	}

	componentWillUnmount() {
		if (this._historyUnlistener) {
			this._historyUnlistener();
		}
	}

	render() {
		const { children, onMiss, routeConfig } = this.props;
		const { pathname } = this.state.currentLocation;

		const foundRoute = matchRoute(routeConfig, pathname);

		this.mountPointComponent = foundRoute.component;
		this.mountPointParams = foundRoute.params;

		if (foundRoute.isMiss && onMiss) {
			onMiss();
		}

		return React.Children.only(children);
	}
}
