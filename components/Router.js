// @flow

import React, { Component } from 'react';

export type $Routes = { [key: string]: { component: ReactClass<*> }};
export type $Location = Object;
export type $History = Object;

type $Props = {
	history: $History,
	onChange?: (location: $Location) => void,
	routes: $Routes,
	miss: ReactClass<*>,
	children?: React$Element<*>,
};

export default class Router extends Component {
	props: $Props;

	state: {
		currentLocation: $Location,
	};

	_historyUnlistener: () => void;
	renderComponent: ?ReactClass<*>;

	constructor(props: $Props) {
		super(props);

		this._historyUnlistener = props.history.listen(this.historyListener.bind(this));
		this.renderComponent = null;

		this.state = {
			currentLocation: props.history.location,
		};
	}

	static childContextTypes = {
		push: React.PropTypes.func,
		getRouterRenderComponent: React.PropTypes.func,
		getLocation: React.PropTypes.func,
	}

	getChildContext() {
		return {
			push: (path: string, state: Object = {}) => this.props.history.push(path, state),
			getRouterRenderComponent: () => this.renderComponent,
			getLocation: () => this.props.history.location,
		};
	}

	historyListener(location: $Location) {
		if (this.props.onChange) {
			this.props.onChange(location);
		}

		this.setState({ currentLocation: location });
	}

	componentWillUnmount() {
		if (this._historyUnlistener) {
			this._historyUnlistener();
		}
	}

	render() {
		const { routes, miss } = this.props;
		const { pathname } = this.state.currentLocation;

		this.renderComponent = routes.hasOwnProperty(pathname) ? routes[pathname].component : miss;

		return React.Children.only(this.props.children);
	}
}
