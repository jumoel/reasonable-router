import createContext from 'create-react-context';

// eslint-disable-next-line no-unused-vars
const push = (path, state = {}) => {};
const getRouterRenderProperties = () => ({
	params: {},
	Component: () => null,
});
const getCurrentLocation = () => ({
	hash: '',
	pathname: '/',
	search: '',
	state: undefined,
});
const getRoutes = () => ({});

const defaultContext = {
	push,
	getRouterRenderProperties,
	getCurrentLocation,
	getRoutes,
};

export const Context = createContext(defaultContext);
