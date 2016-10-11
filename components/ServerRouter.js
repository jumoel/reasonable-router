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
};

export class ServerRouter extends Component {
	props: Props;

	state: {
		history: $History,
	};

	constructor(props: Props) {
		super(props);

		this.state = {
			history: createMemoryHistory({ initialEntries: [ props.location ]}),
		};
	}

	render() {
		const { routes, miss, children } = this.props;

		return <Router routes={routes} miss={miss} history={this.state.history} children={children} />;
	}
}
