import React from 'react';
import { shallow } from 'enzyme';

import Link from '../Link';

describe('<Link />', () => {
	it('renders with the proper text', () => {
		const link = shallow(
			<Link href='/'>Linktext</Link>
		);

		expect(link.text()).toEqual('Linktext');
	});

	it('renders with the proper `href` attribute', () => {
		const link = shallow(
			<Link href='/'>Linktext</Link>
		);

		expect(link.prop('href')).toEqual('/');
	});

	it('renders with a named route', () => {
		const getRoutes = () => ({ '/': { name: 'Frontpage' }});

		const link = shallow(
			<Link to='Frontpage'>Linktext</Link>,
			{ context: { getRoutes } }
		);

		expect(link.prop('href')).toEqual('/');
		expect(link.text()).toEqual('Linktext');
	});

	it('warns when `href` prop is invalid', () => {
		console.warn = jest.fn();

		shallow(<Link href=''>Linktext</Link>);

		expect(console.warn).toBeCalled();
	});

	it('warns when `to` prop is invalid', () => {
		console.warn = jest.fn();
		const getRoutes = () => ({});

		shallow(
			<Link to='NotFound'>Linktext</Link>,
			{ context: { getRoutes } }
		);

		expect(console.warn).toBeCalled();
	});

	it('navigates properly with the context method', () => {
		expect(false).toBeTruthy();
	});
});
