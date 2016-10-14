// @flow

import React, { Component } from 'react';
import { createBrowserHistory } from 'history';

import Router from './Router';
import type { $Routes, $History } from './Router';

type Props = {
	routes: $Routes,
	miss: ReactClass<*>,
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
