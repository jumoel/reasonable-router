import createContext from 'create-react-context';

// eslint-disable-next-line no-unused-vars
const push = (path, state = {}) => {};
const routerRenderProperties = {
	params: {},
	Component: () => null,
};
const currentLocation = {
	hash: '',
	pathname: '/',
	search: '',
	state: undefined,
};
const routes = {};

const defaultContext = {
	push,
	routerRenderProperties,
	currentLocation,
	routes,
};

export const Context = createContext(defaultContext);
