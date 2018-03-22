import React, { Component } from 'react';
import { createBrowserHistory } from 'history';

import { Context } from './Context';
import { matchRoute } from './matchRoute';

export class BrowserRouter extends Component {
	constructor(props) {
		super(...arguments);

		const history = props.history || createBrowserHistory();

		this.push = (path, state = {}) => {
			history.push(path, state);
		};

		const routeProps = this.matchRoute(history.location);
		if (routeProps.isRedirect) {
			this.push(routeProps.pathname);
		}

		this.state = {
			context: this.getDerivedContext(
				history.location,
				{
					push: this.push,
					routerRenderProperties: {
						params: {},
						Component: null,
						isMiss: false,
					},
					currentLocation: history.location,
					routes: props.routeConfig.routes,
				},
				props,
			),
		};

		this._historyUnlistener = history.listen(this.historyListener.bind(this));
	}

	historyListener(location) {
		if (this.props.onChange) {
			this.props.onChange(location);
		}

		const routeProps = this.matchRoute(location);
		if (routeProps.isRedirect) {
			this.push(routeProps.pathname);
		} else {
			this.updateContext(location);
		}
	}

	matchRoute(location) {
		const { pathname } = location;
		return matchRoute(this.props.routeConfig, pathname);
	}

	componentWillUnmount() {
		if (this._historyUnlistener) {
			this._historyUnlistener();
		}
	}

	getDerivedContext(location, prevContext, props) {
		const { pathname } = location;
		const { params, component: Component, isMiss, isRedirect } = matchRoute(
			props.routeConfig,
			pathname,
		);

		return {
			...prevContext,
			currentLocation: location,
			routerRenderProperties: { Component, params, isMiss, isRedirect },
		};
	}

	updateContext(location) {
		this.setState((prevState, props) => {
			return {
				...prevState,
				context: this.getDerivedContext(location, prevState.context, props),
			};
		});
	}

	render() {
		const { children, onMiss } = this.props;
		const { isMiss } = this.state.context.routerRenderProperties;

		if (isMiss && onMiss) {
			onMiss();
		}

		if (!children) {
			return null;
		}

		return (
			<Context.Provider value={this.state.context}>{children}</Context.Provider>
		);
	}
}
