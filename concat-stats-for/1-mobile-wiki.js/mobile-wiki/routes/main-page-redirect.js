define('mobile-wiki/routes/main-page-redirect', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Route = Ember.Route,
	    inject = Ember.inject;
	exports.default = Route.extend({
		wikiVariables: inject.service(),
		fastboot: inject.service(),

		beforeModel: function beforeModel() {
			if (this.get('fastboot.isFastBoot')) {
				this.get('fastboot').set('response.statusCode', 301);
				this.get('fastboot.response.headers').set('location', this.get('wikiVariables.basePath') + this.get('wikiVariables.articlePath') + encodeURIComponent(this.get('wikiVariables.mainPageTitle')));
			} else {
				this.replaceWith('wiki-page', this.get('wikiVariables.mainPageTitle'));
			}

			return false;
		}
	});
});