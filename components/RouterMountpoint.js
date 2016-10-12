// @flow

import React, { Component } from 'react';

export default class RouterMountpoint extends Component {
	static contextTypes = {
		getRouterRenderProperties: React.PropTypes.func,
	};

	render() {
		const { params, Component } = this.context.getRouterRenderProperties();
		console.log(this.context.getRouterRenderProperties());

		return <Component routeParams={params} />;
	}
}
