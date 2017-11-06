define('mobile-wiki/components/lightbox-ads', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Ember.Component.extend({
		classNames: ['lightbox-ads', 'lightbox-content-inner'],

		/**
   * @returns {void}
   */
		didInsertElement: function didInsertElement() {
			var _this = this;

			var closeButtonDelay = this.get('lightboxCloseButtonDelay') || 0,
			    showCloseButtonAfterCountDown = function showCloseButtonAfterCountDown() {
				if (_this.get('lightboxCloseButtonDelay') > 0) {
					Ember.run.later(_this, function () {
						_this.decrementProperty('lightboxCloseButtonDelay');
						showCloseButtonAfterCountDown();
					}, 1000);
				} else {
					_this.sendAction('setCloseButtonHidden', false);
				}
			};

			this.sendAction('setHeader', 'Advertisement');

			if (closeButtonDelay > 0) {
				this.sendAction('setCloseButtonHidden', true);
				showCloseButtonAfterCountDown();
			}
		}
	});
});