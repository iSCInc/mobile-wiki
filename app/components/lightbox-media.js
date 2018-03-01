import {inject as service} from '@ember/service';
import Component from '@ember/component';
import {htmlSafe} from '@ember/string';
import {isArray} from '@ember/array';
import {observer, computed} from '@ember/object';
import ThirdsClickMixin from '../mixins/thirds-click';
import {normalizeToUnderscore} from '../utils/string';
import RenderComponentMixin from '../mixins/render-component';

export default Component.extend(
	RenderComponentMixin,
	ThirdsClickMixin,
	{
		logger: service(),

		classNames: ['lightbox-media', 'lightbox-content-inner'],
		// This is needed for keyDown event to work
		attributeBindings: ['tabindex'],

		tabindex: 0,
		videoPlayer: null,

		/* eslint ember/avoid-leaking-state-in-ember-objects:0 */
		gestures: {
			/**
			 * @returns {void}
			 */
			swipeLeft() {
				if (this.get('isGallery')) {
					this.nextMedia();
				}
			},

			/**
			 * @returns {void}
			 */
			swipeRight() {
				if (this.get('isGallery')) {
					this.prevMedia();
				}
			},
		},

		setFooter() {},
		setHeader() {},

		/**
		 * gets current media from model
		 */
		current: null, // TODO: figure out what to do with it

		/**
		 * gets current media or current media from gallery
		 */
		currentMedia: computed('current', 'isGallery', 'currentGalleryRef', function () {
			const current = this.get('current');

			return this.get('isGallery') ? current[this.get('currentGalleryRef')] : current;
		}),

		currentGalleryRef: computed('model.galleryRef', {
			get() {
				return this.get('model.galleryRef') || 0;
			},

			set(key, value) {
				const galleryLength = this.get('galleryLength') - 1;

				if (value < 0) {
					return galleryLength;
				} else if (value > galleryLength) {
					return 0;
				}

				return value;
			},
		}),

		galleryLength: computed('isGallery', 'current', function () {
			return this.get('isGallery') ? this.get('current').length : -1;
		}),

		/**
		 * checks if current displayed media is a gallery
		 */
		isGallery: computed('current', function () {
			return isArray(this.get('current'));
		}),

		/**
		 * checks if current media is a video or image and which lightbox component to render
		 */
		lightboxComponent: computed('currentMedia', function () {
			const currentMedia = this.get('currentMedia');

			return currentMedia && currentMedia.url && currentMedia.type ? `lightbox-${currentMedia.type}` : null;
		}),

		modelObserver: observer('model', 'currentMedia', function () {
			this.updateState();
		}),

		/**
		 * @returns {void}
		 */
		didRender() {
			this._super(...arguments);
			this.updateState();
		},

		/**
		 * @param {MouseEvent} event
		 * @returns {void}
		 */
		click(event) {
			if (this.get('isGallery')) {
				this.callClickHandler(event, true);
			} else {
				this._super(event);
			}
		},

		/**
		 * @param {Event} event
		 * @returns {void}
		 */
		keyDown(event) {
			if (this.get('isGallery')) {
				if (event.keyCode === 39) {
					// handle right arrow
					this.nextMedia();
				} else if (event.keyCode === 37) {
					// handle left arrow
					this.prevMedia();
				}
			}

			this._super(event);
		},

		/**
		 * @returns {boolean}
		 */
		rightClickHandler() {
			this.nextMedia();
			return true;
		},

		/**
		 * @returns {boolean}
		 */
		leftClickHandler() {
			this.prevMedia();
			return true;
		},

		/**
		 * @returns {boolean}
		 */
		centerClickHandler() {
			// Bubble up
			return false;
		},

		/**
		 * @returns {void}
		 */
		nextMedia() {
			this.incrementProperty('currentGalleryRef');
		},

		/**
		 * @returns {void}
		 */
		prevMedia() {
			this.decrementProperty('currentGalleryRef');
		},

		/**
		 * @returns {void}
		 */
		updateState() {
			this.updateHeader();
			this.updateFooter();
		},

		/**
		 * @returns {void}
		 */
		updateHeader() {
			let header = null;

			if (this.get('isGallery')) {
				header = `${(this.get('currentGalleryRef') + 1)} / ${this.get('galleryLength')}`;
			}

			this.get('setHeader')(header);
		},

		/**
		 * @returns {void}
		 */
		updateFooter() {
			const currentMedia = this.get('currentMedia');

			if (currentMedia && currentMedia.caption) {
				this.get('setFooter')(htmlSafe(currentMedia.caption));
			} else {
				this.get('setFooter')(null);
			}
		},
	}
);
