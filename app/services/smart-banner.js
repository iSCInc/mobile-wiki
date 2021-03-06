import { computed } from '@ember/object';
import { and, equal, readOnly } from '@ember/object/computed';
import Service, { inject as service } from '@ember/service';
import { track } from '../utils/track';
import config from '../config/environment';

export default Service.extend({
  currentUser: service(),
  wikiVariables: service(),

  smartBannerVisible: false,
  dayInMiliseconds: 86400000,
  cookieName: 'fandom-sb-closed',
  trackCategory: 'fandom-app-smart-banner',

  dbName: readOnly('wikiVariables.dbName'),
  isUserLangEn: equal('currentUser.language', 'en'),
  shouldShowFandomAppSmartBanner: and('isUserLangEn', 'wikiVariables.enableFandomAppSmartBanner'),
  isFandomAppSmartBannerVisible: and('shouldShowFandomAppSmartBanner', 'smartBannerVisible'),

  setVisibility(state) {
    this.set('smartBannerVisible', state);
  },

  /**
	 * Sets smart banner cookie for given number of days
	 *
	 * @param {number} days
	 * @returns {void}
	 */
  setCookie(days) {
    const date = new Date();
    const cookieOptions = {
      expires: date,
      path: '/',
      domain: config.APP.cookieDomain,
    };

    date.setTime(date.getTime() + (days * this.dayInMiliseconds));
    window.Cookies.set(this.cookieName, 1, cookieOptions);
  },

  isCookieSet() {
    return window.Cookies.get(this.cookieName) === '1';
  },

  /**
	 * @param {string} action
	 * @returns {void}
	 */
  track(action) {
    track({
      action,
      category: this.trackCategory,
      label: this.dbName,
    });
  },
});
