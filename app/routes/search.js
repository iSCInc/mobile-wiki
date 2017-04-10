import Ember from 'ember';
import {track, trackActions, trackPageView} from '../utils/track';
import SearchModel from '../models/search';
import RouteWithBodyClassNameMixin from '../mixins/route-with-body-class-name';

const {Route, inject} = Ember;

export default Route.extend(
	RouteWithBodyClassNameMixin,
	{
		wikiVariables: inject.service(),
		bodyClassNames: ['search-result-page', 'show-global-footer'],
		queryParams: {
			query: {
				refreshModel: true
			}
		},

		model(params) {
			const model = SearchModel.create({
				host: this.get('wikiVariables.host')
			});

			return model.search(params.query);
		},

		actions: {
			/**
			 * @returns {boolean}
			 */
			didTransition() {
				trackPageView();

				track({
					action: trackActions.impression,
					category: 'app',
					label: 'search'
				});

				return true;
			}
		}
	}
);