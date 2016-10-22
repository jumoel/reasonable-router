import React from 'react';
import { shallow } from 'enzyme';

import RouterMountpoint from '../RouterMountpoint';

describe('<RouterMountpoint />', () => {
	it('renders the supplied component and props', () => {
		const Component = (props) => <pre>{ JSON.stringify(props) }</pre>;

		const params = { prop: 'value' };
		const getRouterRenderProperties = () => ({ Component, params });

		const result = shallow(
			<RouterMountpoint />,
			{ context: { getRouterRenderProperties } }
		);

		const child = result.first().shallow();

		expect(result.name()).toEqual('Component');
		expect(child.text()).toEqual('{"routeParams":{"prop":"value"}}');
		expect(child.name()).toEqual('pre');
	});
});
