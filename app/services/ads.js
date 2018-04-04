import {computed} from '@ember/object';
import Service, {inject as service} from '@ember/service';
import Ads from '../modules/ads';

export default Service.extend({
	module: Ads.getInstance(),
	wikiVariables: service(),
	currentUser: service(),
	siteHeadOffset: 0,
	noAdsQueryParam: null,
	noAds: computed('noAdsQueryParam', function () {
		return ['0', null, ''].indexOf(this.get('noAdsQueryParam')) === -1 || this.get('currentUser.isAuthenticated');
	}),
	adSlotComponents: null,

	init() {
		this._super(...arguments);
		this.adSlotComponents = {};
	},

	pushAdSlotComponent(slotName, adSlotComponent) {
		this.get('adSlotComponents')[slotName] = adSlotComponent;
	},

	destroyAdSlotComponents() {
		const adSlotComponents = this.get('adSlotComponents');

		Object.keys(adSlotComponents).forEach((slotName) => {
			if (!adSlotComponents[slotName].get('isDestroyed')) {
				adSlotComponents[slotName].destroy();
			}
		});

		this.set('adSlotComponents', {});
	}
});
