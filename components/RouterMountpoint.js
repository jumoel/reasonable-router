import React, { Component } from 'react';
import { Context } from './Context';

export class RouterMountpoint extends Component {
	renderComponent({ routerRenderProperties }) {
		const { Component, ...rest } = routerRenderProperties;

		return <Component route={{ ...rest }} />;
	}

	render() {
		return <Context.Consumer>{this.renderComponent}</Context.Consumer>;
	}
}
