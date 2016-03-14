import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'portable-infobox-question',
	classNames: ['portable-infobox-question'],
	classNameBindings: ['collapsed', 'submitted'],
	thankYou: false,
	submitted: Ember.computed('thankYou', function () {
		return this.thankYou;
	}),
	invalid: '',
	answer: '',

	actions: {
		submit() {
			// Because article content is not inserted to the page in ember way value from the intupt field
			// is not propagating to answer variable, hence hack below
			const answer = Ember.$('.portable-infobox-question__input')[0].value;

			this.set('answer', answer);
			if (answer) {
				this.set('invalid', '');
				this.set('thankYou', true);
			} else {
				this.set('invalid', 'invalid');
			}
		}
	}
});
