// @flow

import React, { Component } from 'react';

export default class Link extends Component {
	props: {
		href: string,
		children?: React$Element<*>
	};

	static contextTypes = { push: React.PropTypes.func };

	render() {
		const { href, children } = this.props;
		const { push } = this.context;

		return <a href={href} onClick={(e) => { e.preventDefault(); push(href); }} children={children} />;
	}
}
