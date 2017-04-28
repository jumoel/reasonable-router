import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class RouterMountpoint extends Component {
	static contextTypes = {
		getRouterRenderProperties: PropTypes.func,
	};

	render() {
		const {
			params,
			Component,
			...rest
		} = this.context.getRouterRenderProperties();

		return <Component route={{ ...rest, params }} />;
	}
}
