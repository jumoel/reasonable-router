import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createMemoryHistory } from 'history';

export class ServerRouter extends Component {
	constructor(props) {
		super(...arguments);

		this.state = {
			history: createMemoryHistory({ initialEntries: [props.location] }),
		};
	}

	getChildContext() {
		return {
			push: (path, state = {}) => this.state.history.push(path, state),
			getCurrentLocation: () => this.state.history.location,
			getRouterRenderProperties: () => ({
				params: this.props.matchedRoute.params,
				Component: this.props.matchedRoute.component,
			}),
			getRoutes: () => this.props.routeConfig.routes,
		};
	}

	render() {
		const { children } = this.props;

		if (!children) {
			return null;
		}

		return React.Children.only(children);
	}
}

ServerRouter.childContextTypes = {
	push: PropTypes.func,
	getRouterRenderProperties: PropTypes.func,
	getCurrentLocation: PropTypes.func,
	getRoutes: PropTypes.func,
};
