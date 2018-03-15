import React from 'react';
import { mount } from 'enzyme';

import { Context } from '../Context';
import { RouterMountpoint } from '../RouterMountpoint';

describe('<RouterMountpoint />', () => {
	it('renders the supplied component and props', () => {
		const Component = (props) => <pre>{JSON.stringify(props)}</pre>;

		const params = { prop: 'value' };
		const name = 'Test';
		const routerRenderProperties = { Component, params, name };

		const result = mount(
			<Context.Provider value={{ routerRenderProperties }}>
				<RouterMountpoint />
			</Context.Provider>,
		);

		/**
		 * Everything but the Component should be passed as props,
		 * just wrapped in a `route` attribute.
		 */
		const expected = { route: { params, name } };

		expect(JSON.parse(result.text())).toEqual(expected);
		expect(result.text()).toMatchSnapshot();
		expect(result).toMatchSnapshot();
	});
});
