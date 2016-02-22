import Ember from 'ember';
import {getDomain} from '../utils/domain';
import {track, trackActions} from 'common/utils/track';
import RecentWikiActivityModel from '../models/recent-wiki-activity';

export default Ember.Component.extend({
	classNames: ['recent-edit'],
	classNameBindings: ['loaded', 'dismissed'],
	dismissed: false,
	loaded: false,
	recentEdit: null,
	recentWikiActivityLink: '/recent-wiki-activity',
	init() {
		this._super(...arguments);
		RecentWikiActivityModel.getRecentActivityList().then((recentEdit) => {
			this.setProperties({
				loaded: true,
				recentEdit: recentEdit.recentChanges.get('firstObject')
			});

			track({
				action: trackActions.impression,
				category: 'recent-edit-banner',
				label: 'displayed'
			});
		});

	},
	setCookie(expires) {
		Ember.$.cookie('recent-edit-dismissed', 1, {
			domain: getDomain(),
			expires,
			path: '/'
		});
	},
	sendTracking(label) {
		track({
			action: trackActions.click,
			category: 'recent-edit-banner',
			label
		});
	},
	dismissRecentEdit(expires, label) {
		this.setCookie(expires);
		this.sendTracking(label);
		this.set('dismissed', true);
	},
	actions: {
		postpone(label) {
			this.dismissRecentEdit(1, label);
		},
		dismiss(label) {
			this.dismissRecentEdit(10 * 365, label);
		}
	}
});