import Ember from 'ember';
import RecentWikiActivityModel from '../models/recent-wiki-activity';

export default Ember.Route.extend({

	/**
	 * @returns {*}
	 */
	meta() {
		return {
			name: {
				robots: 'noindex, nofollow'
			}
		};
	},

	model() {
		return RecentWikiActivityModel.getRecentActivityList();
	}
});
