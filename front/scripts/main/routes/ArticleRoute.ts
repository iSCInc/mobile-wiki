/// <reference path="../app.ts" />
/// <reference path="../../../../typings/ember/ember.d.ts" />

'use strict';

App.ArticleRoute = Em.Route.extend({
	queryParams: {
		file: {
			replace: false
		},
		comments_page: {
			replace: true
		}
	},

	beforeModel: function (transition: EmberStates.Transition) {
		var title = transition.params.article.title ?
			transition.params.article.title.replace('wiki/', ''):
			Mercury.wiki.mainPageTitle;

		if (Mercury.error) {
			transition.abort();
		}
	},

	model: function (params: any) {
		return App.ArticleModel.find({
			basePath: Mercury.wiki.basePath,
			title: params.title,
			wiki: this.controllerFor('application').get('domain')
		});
	},

	afterModel: function (model: any) {
		this.controllerFor('application').set('currentTitle', model.get('title'));
		App.VisibilityStateManager.reset();
		model.set('commentsPage', null);
		model.set('file', null);
	},

	actions: {
		error: function (error: any, transition: EmberStates.Transition) {
			if (transition) {
				transition.abort();
			}
			Em.Logger.warn('ArticleRoute error', error.stack || error);
			return true;
		},

		willTransition: function (transition: EmberStates.Transition) {
			// notify a property change on soon to be stale model for observers (like
			// the Table of Contents menu) can reset appropriately
			this.notifyPropertyChange('cleanTitle');
		},
		// TODO: This currently will scroll to the top even when the app has encountered
		// an error. Optimally, it would remain in the same place.
		didTransition: function () {
			window.scrollTo(0, 0);
			// bubble up to application didTransition hook
			return true;
		}
	}
});
