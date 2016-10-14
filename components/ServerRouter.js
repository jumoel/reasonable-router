// @flow

import React, { Component } from 'react';
import { createMemoryHistory } from 'history';

import Router from './Router';
import type { $Routes, $History } from './Router';

type Props = {
	location: String,
	routes: $Routes,
	miss: ReactClass<*>,
	children?: React$Element<*>,
	onMiss?: () => void,
};

export default class ServerRouter extends Component {
	props: Props;

	state: {
		history: $History,
	};

	constructor(props: Props) {
		super(...arguments);

		this.state = {
			history: createMemoryHistory({ initialEntries: [ props.location ]}),
		};
	}

	render() {
		// Extract `location` to prevent it from being passed to <Router>
		// eslint-disable-next-line no-unused-vars
		const { location, ...rest } = this.props;

		return <Router {...rest} history={this.state.history} />;
	}
}
