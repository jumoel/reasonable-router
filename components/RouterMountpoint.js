import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class RouterMountpoint extends Component {
	render() {
		const {
			params,
			Component,
			...rest
		} = this.context.getRouterRenderProperties();

		return <Component route={{ ...rest, params }} />;
	}
}

RouterMountpoint.contextTypes = {
	getRouterRenderProperties: PropTypes.func,
};
