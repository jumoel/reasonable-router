module.exports = {
	parser: 'babel-eslint',

	plugins: ['eslint-plugin-babel', 'eslint-plugin-react'],

	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
	],

	rules: {
		eqeqeq: ['error'],
		'react/prop-types': ['off'],
	},

	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true,
	},

	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
};
