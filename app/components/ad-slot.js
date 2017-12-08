import {inject as service} from '@ember/service';
import {readOnly} from '@ember/object/computed';
import Component from '@ember/component';
import {dasherize} from '@ember/string';
import {on} from '@ember/object/evented';
import {setProperties, computed} from '@ember/object';
import InViewportMixin from 'ember-in-viewport';
import RenderComponentMixin from '../mixins/render-component';
import logEvent from '../modules/event-logger';

let pubadsErrorLogged = false;

export default Component.extend(
	RenderComponentMixin,
	InViewportMixin,
	{
		classNames: ['ad-slot-wrapper'],
		classNameBindings: ['nameLowerCase', 'noAds'],
		// This component is created dynamically, and this won't work without it
		layoutName: 'components/ad-slot',
		ads: service(),
		logger: service(),
		noAds: readOnly('ads.noAds'),
		disableManualInsert: false,
		isAboveTheFold: false,
		name: null,
		pageHasFeaturedVideo: false,

		nameLowerCase: computed('name', function () {
			return dasherize(this.get('name').toLowerCase());
		}),

		shouldWaitForUapResponse: computed('pageHasFeaturedVideo', 'isAboveTheFold', function () {
			return !(this.get('pageHasFeaturedVideo') || this.get('isAboveTheFold'));
		}),

		didInsertElement() {
			this._super(...arguments);

			const ads = this.get('ads.module'),
				name = this.get('name');

			if (this.get('disableManualInsert')) {
				return;
			}

			if (this.get('noAds')) {
				this.get('logger').info('Ad disabled for:', name);
				return;
			}

			if (this.get('shouldWaitForUapResponse')) {
				ads.waitForUapResponse(
					() => {
					},
					() => {
						this.get('logger').info('Injected ad:', name);
						ads.pushSlotToQueue(name);
					}
				);
			} else {
				this.get('logger').info('Injected ad', name);
				ads.pushSlotToQueue(name);
			}

			setProperties(this, {
				viewportTolerance: {
					top: 200,
					bottom: 200
				}
			});
		},

		/**
		 * @returns {void}
		 */
		didEnterViewport() {
			const ads = this.get('ads.module'),
				name = this.get('name');

			if (this.get('noAds')) {
				this.get('logger').info('Ad disabled for:', name);
				return;
			}

			if (this.get('shouldWaitForUapResponse')) {
				ads.waitForUapResponse(
					() => {
						this.get('logger').info('Injected ad on scroll:', name);
						ads.pushSlotToQueue(name);
					},
					() => {
					}
				);
			}
		},

		willDestroyElement() {
			try {
				const name = this.get('name');

				this.get('logger').info('Will destroy ad:', name);
				// XW-4268 - temporary fix that prevents interrupting glimmer transaction,
				// when exception of pubads being undefined is thrown
				if (window.googletag && window.googletag.pubads) {
					this.get('ads.module').removeSlot(name);
				} else if (!pubadsErrorLogged) {
					logEvent('pubads error', 'window.googletag.pubads is undefined');
					pubadsErrorLogged = true;
				}
			} catch(e) {
				console.error(e);
			}
		}
	}
);
