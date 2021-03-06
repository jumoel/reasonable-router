import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { formatRoute } from './formatRoutes';

export class Link extends Component {
	routeFromName(to, params) {
		const routes = this.context.getRoutes();
		const routeKey = Object.keys(routes).find(
			(routeKey) => routes[routeKey].name && routes[routeKey].name === to,
		);

		if (!routeKey) {
			return undefined;
		}

		const matched = formatRoute(routeKey, routes[routeKey]);

		return matched.route.reverse(params || {});
	}

	render() {
		const { to, params, children, style, className } = this.props;
		const { push } = this.context;

		const href = to ? this.routeFromName(to, params) : this.props.href;

		if (process.env.NODE_ENV !== 'production') {
			if (!href) {
				// Won't print in production, so console is fine
				// eslint-disable-next-line no-console
				console.warn('Invalid target for <Link>', {
					to: this.props.to,
					href: this.props.href,
				});
			}
		}

		return (
			<a
				href={href}
				onClick={(e) => {
					e.preventDefault();
					push(href);
				}}
				className={className}
				style={style}
			>
				{children}
			</a>
		);
	}
}

Link.contextTypes = {
	push: PropTypes.func,
	getRoutes: PropTypes.func,
};
