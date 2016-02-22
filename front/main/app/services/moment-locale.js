import Ember from 'ember';
import moment from 'moment';

export default Ember.Service.extend({
	isLoaded: false,
	isLoading: false,
	// Path to all supported locales, so they can be revved
	localePath: {
		de: '/front/main/moment/de.js',
		es: '/front/main/moment/es.js',
		fr: '/front/main/moment/fr.js',
		it: '/front/main/moment/it.js',
		ja: '/front/main/moment/ja.js',
		pl: '/front/main/moment/pl.js',
		'pt-br': '/front/main/moment/pt-br.js',
		ru: '/front/main/moment/ru.js',
		'zh-cn': '/front/main/moment/zh-cn.js',
		'zh-tw': '/front/main/moment/zh-tw.js'
	},
	/**
	 * Changes status of downloading moment's locale to trigger helper's observers
	 *
	 * @param {boolean} done
	 * @return {void}
	 */
	changeLoadingStatus(done = true) {
		this.setProperties({
			isLoaded: done,
			isLoading: !done
		});
	},
	/**
	 * Changes moment locale to en. It's loaded by default, so we don't need to download it
	 *
	 * @return {void}
	 */
	setEnLocale() {
		moment.locale('en');
		Ember.run.next(() => {
			this.changeLoadingStatus();
		});
	},
	/**
	 * Downloads locale for moment if content language is not en, otherwise just changes to en
	 *
	 * @return {void}
	 */
	loadLocale() {
		const contentLang = Ember.get(Mercury, 'wiki.language.content'),
			lang = this.localePath.hasOwnProperty(contentLang) ? contentLang : 'en';

		this.changeLoadingStatus(false);
		if (lang === 'en') {
			this.setEnLocale();
		} else {
			Ember.$.getScript(this.localePath[lang]).done(() => {
				this.changeLoadingStatus();
			}).fail((jqxhr, settings, exception) => {
				Ember.Logger.error(`Can't get moment translation for ${lang} | ${exception}`);
				this.setEnLocale();
			});
		}
	},
	/**
	 * Returns true when locale is set, so helpers will display date instead of placeholders
	 *
	 * @return {boolean}
	 */
	isLocaleLoaded() {
		if (this.isLoaded) {
			return true;
		} else if (!this.isLoading) {
			this.loadLocale();
		}
		return false;
	},
	// Extends default en translation by needed relative time on init
	init() {
		this._super();
		moment.locale('en', {
			relativeTime: {
				m: '1m',
				mm: '%dm',
				h: '1h',
				hh: '%dh',
				d: '1d',
				dd: '%dd'
			}
		});
	}
});
