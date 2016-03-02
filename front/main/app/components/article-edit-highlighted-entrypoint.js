import Ember from 'ember';
import {track, trackActions} from 'common/utils/track';
import LanguagesMixin from '../mixins/languages';

export default Ember.Component.extend(
	LanguagesMixin,
	{
		classNames: ['article-edit-highlighted-entrypoint'],
		classNameBindings: ['displayEdit'],
		displayEdit: Ember.computed('showEdit', function () {
			const showEdit = this.get('showEdit');

			if (showEdit === true) {
				return 'show-edit';
			} else if (showEdit === false) {
				return 'hide-edit';
			}

			return '';
		}),
		actions: {
			editSection() {
				const title = this.get('title'),
					section = this.get('section'),
					highlightedText = this.get('highlightedText');

				if (this.get('editAllowed')) {
					this.sendAction('edit', title, section, highlightedText);
					track({
						action: trackActions.click,
						category: 'highlighted-editor',
						label: 'entry-point-allowed'
					});
				} else {
					this.redirectToLogin(title, section, highlightedText);
					track({
						action: trackActions.click,
						category: 'highlighted-editor',
						label: 'entry-point-not-allowed'
					});
				}
			}
		},

		redirectToLogin(title, section, highlightedText) {
			let redirect = `${window.location.origin}/wiki/edit/${title}/${section}`;

			if (highlightedText) {
				redirect += `?highlighted=${highlightedText}`;
			}

			window.location.assign(M.buildUrl({path: '/join', query: {redirect}}));
		}
	}
);
