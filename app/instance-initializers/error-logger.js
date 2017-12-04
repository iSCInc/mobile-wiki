import logEvent from '../modules/event-logger';
import Ember from 'ember';

export function initialize(/* appInstance */) {
	if (typeof FastBoot !== 'undefined') {
		return;
	}
	Ember.onerror = function (error) {
		logEvent('Ember.onerror', {
			message: error.message,
			stack: error.stack,
			// temp logging for XW-4268
			pubadsExists: window.wikiaGoogleTagPubAdsExists
		});

		// To be able to display it in console
		throw error;
	};
}

export default {
	after: 'config',
	name: 'error-logger',
	initialize
};
