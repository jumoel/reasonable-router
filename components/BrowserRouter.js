import React, { Component } from 'react';
import { createBrowserHistory } from 'history';

import { Context } from './Context';
import { matchRoute } from './matchRoute';

export class BrowserRouter extends Component {
	constructor(props) {
		super(...arguments);

		const history = props.history || createBrowserHistory();

		this.state = {
			context: this.getDerivedContext(
				history.location,
				{
					push: (path, state = {}) => history.push(path, state),
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

		if (this.props.browser) {
			this.updateContext(location);
		}
	}

	componentWillUnmount() {
		if (this._historyUnlistener) {
			this._historyUnlistener();
		}
	}

	getDerivedContext(location, prevContext, props) {
		const { pathname } = location;
		const { params, component: Component, isMiss } = matchRoute(
			props.routeConfig,
			pathname,
		);

		return {
			...prevContext,
			currentLocation: location,
			routerRenderProperties: { Component, params, isMiss },
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
