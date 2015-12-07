import App from '../app';

export default App.ImageReviewComponent = Ember.Component.extend({
	classNames: ['image-review'],
	isLoading: false,

	actions: {
		reviewImages() {
			this.sendAction('reviewImages');
		},

		getMoreImages() {
			this.sendAction('getMoreImages');
		},

		reviewAndGetMoreImages() {
			this.sendAction('reviewAndGetMoreImages');
		},

		showModal(id) {
			this.sendAction('showModal', id);
		}
	}
});
