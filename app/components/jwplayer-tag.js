import $ from 'jquery';
import Component from '@ember/component';
import {Promise} from 'rsvp';
import jwPlayerAssets from '../modules/jwplayer-assets';
import {track} from '../utils/track';

export default Component.extend({
	jwVideoDataUrl: 'https://cdn.jwplayer.com/v2/media/',

	/**
	 * @returns {void}
	 */
	didInsertElement() {
		Promise.all([
			jwPlayerAssets.load(),
			this.getVideoData()
		]).then(([, videoData]) => {
			window.wikiaJWPlayer(
				this.get('element-id'),
				this.getPlayerSetup(videoData)
			);
		});
	},

	getPlayerSetup(jwVideoData) {
		return {
			autoplay: false,
			tracking: {
				category: 'in-article-video',
				track(data) {
					data.trackingMethod = 'both';

					track(data);
				},
			},
			videoDetails: {
				description: jwVideoData.description,
				title: jwVideoData.title,
				playlist: jwVideoData.playlist
			}
		};
	},

	getVideoData() {
		return $.get(`${this.jwVideoDataUrl}${this.get('media-id')}`);
	}
});