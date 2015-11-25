import App from '../app';

App.DiscussionBaseModel = Ember.Object.extend({
	wikiId: null,
	forumId: null,

	errorCodes: {
		notFound: 404
	},
	errorClass: 'discussion-error-page',
	connectionError: null,
	notFoundError: null,

	/*
	 * Set minorError to true, when you don't want to display error message e.g.:
	 * 404 on infinite scroll, when unable to load non-existing pages
	 * 404 on "view older replies" button, when unable to load non-existing or deleted replies
	 */
	minorError: false,

	/**
	 * @param {Object} err
	 * @returns {void}
	 */
	setErrorProperty(err) {
		if (err.status === this.errorCodes.notFound) {
			this.set('notFoundError', true);
		} else {
			this.set('connectionError', true);
		}
		Ember.$('body').addClass(this.errorClass);
	},

	/**
	 * @param {Object} err
	 * @returns {void}
	 */
	handleLoadMoreError(err) {
		if (err.status === this.errorCodes.notFound) {
			this.set('minorError', true);
		} else {
			this.setErrorProperty(err);
		}
	}
});

export default App.DiscussionBaseModel;
