import Ember from 'ember';
import moment from 'moment';
import request from 'ember-ajax/request';

const ImageReviewSummaryModel = Ember.Object.extend({
	summary: null,
	showSubHeader: true,

	setSummaryModel() {
		if (!Ember.isEmpty(this.get('startDate')) || !Ember.isEmpty(this.get('endDate'))) {
			request(M.getImageReviewServiceUrl('/statistics', {
				startDate: this.get('startDate'),
				endDate: this.get('endDate')
			}), {
				method: 'GET'
			}).then((payload) => {
				this.set('summary', payload);
			});
		}
	},

	setStartDate(startDate) {
		this.set('startDate', moment(startDate).format('YYYY-MM-DD'));
		this.set('csvLink', M.getImageReviewServiceUrl('/statistics/csv', {
			startDate: this.get('startDate'),
			endDate: this.get('endDate')
		}));
	},

	setEndDate(endDate) {
		this.set('endDate', moment(endDate).format('YYYY-MM-DD'));
		this.set('csvLink', M.getImageReviewServiceUrl('/statistics/csv', {
			startDate: this.get('startDate'),
			endDate: this.get('endDate')
		}));
	}
});

ImageReviewSummaryModel.reopenClass({
	createEmptyModel() {
		const startDate = moment(new Date()).format('YYYY-MM-DD');
		const endDate = moment(new Date()).format('YYYY-MM-DD');
		const csvLink = M.getImageReviewServiceUrl('/statistics/csv', {startDate, endDate});

		return request(M.getImageReviewServiceUrl('/info', {}), {
			method: 'GET',
		}).then((payload) => {
			return ImageReviewSummaryModel.create({
				userCanAuditReviews: payload.userAllowedToAuditReviews,
				startDate,
				endDate,
				csvLink,
			});
		});
	}
});

export default ImageReviewSummaryModel;