import Ember from 'ember';
import AdsMixin from '../mixins/ads.js';
import TrackClickMixin from '../mixins/track-click.js';

const MainPageComponent = Ember.Component.extend(
	AdsMixin,
	TrackClickMixin,
	{
		classNames: ['main-page-modules', 'main-page-body'],
		tagName: 'section',

		featuredContentComponentVariation: Ember.computed(() => {
			const experimentIds = {
					prod: '3079180094',
					dev: '3054131385',
				},
				variationNumber = Mercury.Utils.VariantTesting.getExperimentVariationNumber(experimentIds);

			switch (variationNumber) {
			case 1:
				return 'featured-content-variation-1';
			case 2:
				return 'featured-content-variation-2';
			case 3:
				return 'featured-content-variation-3';
			default:
				return 'featured-content';
			}
		}),

		curatedContentToolButtonVisible: Ember.computed.and('currentUser.rights.curatedcontent'),

		actions: {
			/**
			 * @param {string} lightboxType
			 * @param {Object} lightboxData
			 * @returns {void}
			 */
			openLightbox(lightboxType, lightboxData) {
				this.sendAction('openLightbox', lightboxType, lightboxData);
			},

			/**
			 * @param {CuratedContentItem} item
			 * @returns {void}
			 */
			openCuratedContentItem(item) {
				this.sendAction('openCuratedContentItem', item);
			},
		},

		/**
		 * @returns {void}
		 */
		didReceiveAttrs() {
			Ember.run.schedule('afterRender', this, () => {
				M.setTrackContext({
					a: this.get('title'),
					n: this.get('ns'),
				});

				M.updateTrackedUrl(window.location.href);
				M.trackPageView(this.get('adsContext.targeting'));

				this.injectMainPageAds();
				this.setupAdsContext(this.get('adsContext'));
			});
		},
	}
);

export default MainPageComponent;
