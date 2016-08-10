import Ember from 'ember';
import request from 'ember-ajax/request';
import VisibilityStateManager from '../visibility-state-manager';
import BaseHandler from './base-handler';

/**
 * @param {Ember.Route} route
 * @param {Ember.model} model
 * @returns {void}
 */
function afterModel(route, model) {
	route.controllerFor('application').set('currentTitle', model.get('title'));
	VisibilityStateManager.reset();

	// Reset query parameters
	model.set('commentsPage', null);

	route.set('redirectEmptyTarget', model.get('redirectEmptyTarget'));
}

/**
 * This function tracks page view only on articles on Lyrics Wiki (id: 43339).
 * Notice that params amgid and gracenoteid are set to 0, those params are not important,
 * but to be consistent with Oasis we send them
 *
 * https://github.com/Wikia/app/blob/dev/extensions/3rdparty/LyricWiki/LyricFind/js/modules/LyricFind.Tracker.js
 *
 * @param {string} title
 */
function sendLyricsPageView(title) {
	if (Ember.get(Mercury, 'wiki.id') === 43339) {
		request(M.buildUrl({path: '/wikia.php'}), {
			data: {
				controller: 'LyricFind',
				method: 'track',
				title,
				amgid: 0,
				gracenoteid: 0,
				rand: (`${Math.random()}`).substr(2, 8)
			},
			dataType: 'text'
		});
	}
}

/**
 * Hook triggered on transition.then() in Route::afterModel()
 *
 * @param model
 */
function afterTransition(model) {
	sendLyricsPageView(model.get('title'));
}

/**
 * Export Article handler
 */
export default Ember.$.extend({}, BaseHandler, {
	// template's and controller's name
	controllerName: 'article',
	viewName: 'article',
	afterModel,
	afterTransition
});
