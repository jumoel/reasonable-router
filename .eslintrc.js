module.exports = {
	parser: 'babel-eslint',

	plugins: [
		'eslint-plugin-babel',
		'eslint-plugin-react',
		'eslint-plugin-flowtype',
	],

	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:flowtype/recommended',
	],

	rules: {
    'jsx-quotes': ['error', 'prefer-single'],
    'quotes': ['error', 'single', 'avoid-escape'],
    'eqeqeq': ['error'],
    'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
    'semi': ['error', 'always'],
    'no-extra-semi': 'error',
    'comma-dangle': ['error', 'always-multiline'],
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
