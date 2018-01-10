import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

// we in some places and some addons like mirage still use import Ember from 'ember' from ember-cli-shims
// We have removed shims, so to make them work we need to redefine it
// This can be removed when ember-cli-shims is officially sunset
/* global define */
/* eslint prefer-arrow-callback:0 */
define('ember', function () {
	return Ember;
});

const App = Application.extend({
	// We specify a rootElement, otherwise Ember appends to the <body> element and Google PageSpeed thinks we are
	// putting blocking scripts before our content
	rootElement: '#ember-container',
	modulePrefix: config.modulePrefix,
	podModulePrefix: config.podModulePrefix,
	Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
