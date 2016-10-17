import React from 'react';
import { shallow } from 'enzyme';

import Link from '../Link';

describe('Link', () => {
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

	expect(link.find({ href: '/' }).length).toEqual(1);
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
});
