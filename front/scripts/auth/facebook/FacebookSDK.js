/**
 * @typedef {Object} Window
 * @property {object} FB
 * @property {Function} fbAsyncInit
 * @property {string} facebookAppId
 */

/**
 * @class FacebookSDK
 *
 * @property {string} version
 */
export class FacebookSDK {
	/**
	 * Modified code for async download of Facebook SDK javascript
	 *
	 * @param {Function} [onLoad=Function.prototype]
	 * @returns {void}
	 */
	constructor(onLoad = Function.prototype) {
		if (window.document.getElementById('facebook-jssdk')) {
			return;
		}

		const js = window.document.createElement('script'),
			firstJS = window.document.getElementsByTagName('script')[0];

		js.id = 'facebook-jssdk';
		js.src = '//connect.facebook.net/en_US/sdk.js';
		firstJS.parentNode.insertBefore(js, firstJS);

		window.fbAsyncInit = () => {
			window.FB.init({
				appId: window.pageParams.facebookAppId,
				cookie: true,
				version: FacebookSDK.version
			});

			onLoad();
		};

		this.version = 'v2.2';
	}
}
