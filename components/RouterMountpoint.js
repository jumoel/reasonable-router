// @flow

import React, { Component } from 'react';

export default class RouterMountpoint extends Component {
	static contextTypes = {
		getRouterRenderComponent: React.PropTypes.func,
	};

	render() {
		const Component = this.context.getRouterRenderComponent();

		return <Component />;
	}
}
