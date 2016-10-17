// @flow
import React, { Component, PropTypes } from 'react';

type HrefProps = {|
	to: null,
	href: string,
	children?: React$Element<*>
|};

type ToProps = {|
	to: string,
	href: null,
	children?: React$Element<*>,
|};

export default class Link extends Component {
	props: HrefProps | ToProps;

	routeFromName(to: string): ?string {
		const routes = this.context.getRoutes();
		return Object.keys(routes).find(routeKey => (
			routes[routeKey].name && routes[routeKey].name === to
		));
	}

	static contextTypes = {
		push: PropTypes.func,
		getRoutes: PropTypes.func,
	};

	render() {
		const { to, children } = this.props;
		const { push } = this.context;
		const NODE_ENV = process && process.env && process.env.NODE_ENV ? process.env.NODE_ENV : 'production';

		const href = to ? this.routeFromName(to) : this.props.href;

		if (NODE_ENV !== 'production') {
			if (!href) {
				// Won't print in production, so console is fine
				// eslint-disable-next-line no-console
				console.warn('Invalid target for <Link>', { to: this.props.to, href: this.props.href });
			}
		}

		return <a href={href} onClick={(e) => { e.preventDefault(); push(href); }} children={children} />;
	}
}
