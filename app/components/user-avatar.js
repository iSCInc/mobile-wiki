import {inject as service} from '@ember/service';
import Component from '@ember/component';
import {computed} from '@ember/object';
import {buildUrl} from '../utils/url';

export default Component.extend({
	intl: service(),

	classNames: ['user-avatar'],
	shouldWrapInHref: true,

	profileName: computed('username', function () {
		const userName = this.get('username') || '';

		return userName.trim();
	}),
	/**
	 * Returns link to the post author's user page
	 * @returns {string}
	 */
	profileUrl: computed('profileName', function () {
		return buildUrl({
			namespace: 'User',
			relative: true,
			title: this.get('profileName'),
		});
	}),
	displayName: computed('profileName', function () {
		return this.get('anonymous') ? this.get('intl').t('app.username-anonymous') : this.get('profileName');
	}),
});
