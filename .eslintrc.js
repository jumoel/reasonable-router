module.exports = {
	parser: 'babel-eslint',

	plugins: [
		'eslint-plugin-babel',
		'eslint-plugin-react',
		'eslint-plugin-prettier',
		//'eslint-plugin-flowtype',
	],

	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'prettier',
		//'plugin:flowtype/recommended',
	],

	rules: {
		'prettier/prettier': ['error', {
			trailingComma: 'all',
			singleQuote: true,
			useTabs: true,
			bracketSpacing: true,
			semi: true,
		}],
		'eqeqeq': ['error'],
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
