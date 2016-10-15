// @flow

import React, { Component } from 'react';
import { createBrowserHistory } from 'history';

import Router from './Router';
import type { $RouteConfig, $History } from './Router';

type Props = {
	routeConfig: $RouteConfig,
	children?: React$Element<*>,
};

export default class BrowserRouter extends Component {
	props: Props;

	state: {
		history: $History,
	};

	constructor() {
		super(...arguments);

		this.state = {
			history: createBrowserHistory(),
		};
	}

	render() {
		return <Router {...this.props} history={this.state.history} />;
	}
}
