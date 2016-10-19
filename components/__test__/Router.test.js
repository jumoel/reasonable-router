import React from 'react';
import { createMemoryHistory } from 'history';

import Router from '../Router';

describe('<Router />', () => {
	let history;

	beforeEach(() => {
		history = createMemoryHistory({ initialEntries: [ '/page' ]})
	});

	it('renders a page when the route matches', () => {
		expect(false).toBeTruthy();
	});

	it('renders a miss page when the route does not match', () => {
		expect(false).toBeTruthy();
	});

	it('calls the `onMiss` callback when the route does not match', () => {
		expect(false).toBeTruthy();
	});

	it('renders a new page when the route changes', () => {
		expect(false).toBeTruthy();
	});

	it('calls the `onChange` callback when the route changes', () => {
		expect(false).toBeTruthy();
	});
});
