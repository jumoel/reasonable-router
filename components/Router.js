import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { matchRoute } from './matchRoute';

export class Router extends Component {
	constructor(props) {
		super(...arguments);

		this._historyUnlistener = props.history.listen(
			this.historyListener.bind(this),
		);
		this.mountPointComponent = null;
		this.mountPointParams = {};

		this.state = {
			currentLocation: props.history.location,
		};
	}

	getRouterRenderProperties() {
		return {
			params: this.mountPointParams,
			Component: this.mountPointComponent,
		};
	}

	getRoutes() {
		return this.props.routeConfig.routes;
	}

	getChildContext() {
		return {
			push: (path, state = {}) => this.props.history.push(path, state),
			getRouterRenderProperties: this.getRouterRenderProperties.bind(this),
			getCurrentLocation: () => this.state.currentLocation,
			getRoutes: this.getRoutes.bind(this),
		};
	}

	historyListener(location) {
		if (this.props.onChange) {
			this.props.onChange(location);
		}

		if (this.props.browser) {
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

		if (!children) {
			return null;
		}

		return React.Children.only(children);
	}
}

Router.childContextTypes = {
	push: PropTypes.func,
	getRouterRenderProperties: PropTypes.func,
	getCurrentLocation: PropTypes.func,
	getRoutes: PropTypes.func,
};
