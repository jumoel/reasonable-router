import React, { Component } from 'react';
import { createMemoryHistory } from 'history';
import { Context } from './Context';

export class ServerRouter extends Component {
	constructor(props) {
		super(...arguments);

		const history = createMemoryHistory({ initialEntries: [props.location] });

		this.state = {
			context: {
				push: (path, state = {}) => history.push(path, state),
				currentLocation: history.location,
				routerRenderProperties: {
					params: this.props.matchedRoute.params,
					Component: this.props.matchedRoute.component,
				},
				routes: props.routeConfig.routes,
			},
		};
	}

	render() {
		const { children } = this.props;

		if (!children) {
			return null;
		}

		return (
			<Context.Provider value={this.state.context}>{children}</Context.Provider>
		);
	}
}
