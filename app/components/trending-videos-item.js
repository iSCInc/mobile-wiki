import {computed} from '@ember/object';
import {oneWay} from '@ember/object/computed';
import Component from '@ember/component';
import ViewportMixin from '../mixins/viewport';
import Thumbnailer from '../modules/thumbnailer';
import {track, trackActions} from '../utils/track';

export default Component.extend(
	ViewportMixin,
	{
		tagName: 'a',
		classNames: ['trending-videos-item'],
		attributeBindings: ['href'],
		thumbnailer: Thumbnailer,
		cropMode: Thumbnailer.mode.topCrop,
		imageStyle: null,
		video: null,
		imageWidth: 250,
		href: oneWay('video.fileUrl'),

		imageHeight: computed('imageWidth', function () {
			return Math.floor(this.get('imageWidth') * 9 / 16);
		}),

		thumbUrl: computed('video.url', function () {
			const options = {
					width: this.get('imageWidth'),
					height: this.get('imageHeight'),
					mode: this.get('cropMode')
				},
				videoUrl = this.get('video.url');

			if (videoUrl) {
				return this.thumbnailer.getThumbURL(videoUrl, options);
			} else {
				return undefined;
			}
		}),

		/**
		 * @returns {boolean}
		 */
		click() {
			track({
				action: trackActions.click,
				category: 'main-page-trending-videos',
				label: `open-item-${this.get('index')}`
			});
			this.sendAction('action', this.get('video'));

			return false;
		},
	}
);
