import React, { Component } from 'react';
import { createBrowserHistory } from 'history';

import Router from './Router';

export default class BrowserRouter extends Component {
	constructor() {
		super(...arguments);

		this.state = {
			history: createBrowserHistory(),
		};
	}

	render() {
		return (
			<Router {...this.props} history={this.state.history} browser={true} />
		);
	}
}
