import React, { Component } from 'react';
import { createMemoryHistory } from 'history';

import Router from './Router';

export default class ServerRouter extends Component {
	constructor(props) {
		super(...arguments);

		this.state = {
			history: createMemoryHistory({ initialEntries: [props.location] }),
		};
	}

	render() {
		// Extract `location` to prevent it from being passed to <Router>
		// eslint-disable-next-line no-unused-vars
		const { location, ...rest } = this.props;

		return <Router {...rest} history={this.state.history} />;
	}
}
