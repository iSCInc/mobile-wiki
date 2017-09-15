module.exports = {
	root: true,
	parserOptions: {
		sourceType: 'module'
	},
	extends: 'airbnb',
	env: {
		es6: true,
		browser: true,
		jquery: true
	},
	globals: {
		$script: true,
		Ember: true,
		FastBoot: true,
		ga: true,
		Hammer: true,
		Headroom: true,
		M: true,
		VisitSource: true,
		Weppy: true,
		Wikia: true
	},
	rules: {
		"array-callback-return": 0,
		"arrow-body-style": 0,
		"comma-dangle": 0,
		"consistent-return": 0,
		"func-names": 0,
		"global-require": 0,
		"import/no-mutable-exports": 0,
		"import/no-unresolved": 0,
		"indent": [2, "tab", {"VariableDeclarator": 1, "SwitchCase": 1, "CallExpression": {"arguments": 1}}],
		"max-len": [2, 120, 2],
		"new-cap": 0,
		"newline-per-chained-call": 0,
		"no-alert": 0,
		"no-cond-assign": 0,
		"no-else-return": 0,
		"no-multiple-empty-lines": 0,
		"no-param-reassign": 0,
		"no-restricted-syntax": 0,
		"no-shadow": 0,
		"no-underscore-dangle": 0,
		"no-unneeded-ternary": 0,
		"no-unused-vars": 0,
		"no-useless-escape": 0,
		"object-curly-spacing": [2, "never"],
		"one-var": 0,
		"one-var-declaration-per-line": 0,
		"padded-blocks": 0,
		"prefer-const": 0,
		"prefer-rest-params": 0,
		"quotes": [2, "single", {"allowTemplateLiterals": true}],
		"wrap-iife": [2, "inside"]
	}
};
