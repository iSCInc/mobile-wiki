define('mobile-wiki/mixins/viewport', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Ember.Mixin.create({
		fastboot: Ember.inject.service(),

		// This object is shared among all objects which include this mixin
		viewportDimensions: {
			height: null,
			width: null
		},
		initiated: false,

		/**
   * @returns {void}
   */
		init: function init() {
			var _this = this;

			this._super();

			if (!this.get('initiated') && !this.get('fastboot.isFastBoot')) {
				this.onResize();
				Ember.$(window).on('resize', function () {
					_this.onResize();
				});
				this.set('initiated', true);
			}
		},


		/**
   * @returns {void}
   */
		onResize: function onResize() {
			if (!this.get('isDestroyed')) {
				this.setProperties({
					'viewportDimensions.width': Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
					'viewportDimensions.height': Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
				});
			}
		}
	});
});