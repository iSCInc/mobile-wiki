/// <reference path="../../baseline/mercury.ts" />
/// <reference path="../mixins/LanguagesMixin.ts" />

'use strict';

// This was disabled for now and should be re-enabled with https://wikia-inc.atlassian.net/browse/SOC-633 when
// we're ready to launch the new auth pages.
App.LoginIconComponent = Em.Component.extend(App.LanguagesMixin, {
	tagName: 'a',
	classNames: ['external', 'login'],

	/**
	 * @returns {undefined}
	 */
	click(): void {
		var label: string,
			href: string;

		if (Mercury.wiki.enableNewAuth) {
			href = '/join?redirect=' +
			encodeURIComponent(window.location.href) +
			this.getUselangParam();
			label = 'join-link';
		} else {
			label = 'legacy-login-link';
			href = '/Special:UserLogin';
		}

		M.track({
			trackingMethod: 'ga',
			action: M.trackActions.click,
			category: 'user-login-mobile',
			label: label,
		});

		window.location.href = href;

	},
});
