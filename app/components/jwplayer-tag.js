import Component from '@ember/component';
import { Promise } from 'rsvp';
import fetch from 'fetch';
import jwPlayerAssets from '../modules/jwplayer-assets';
import { track } from '../utils/track';
import JWPlayerMixin from '../mixins/jwplayer';
import RenderComponentMixin from '../mixins/render-component';
import config from '../config/environment';

export default Component.extend(RenderComponentMixin, JWPlayerMixin, {
  jwVideoDataUrl: 'https://cdn.jwplayer.com/v2/media/',

  /**
	 * @returns {void}
	 */
  didInsertElement() {
    this._super(...arguments);

    Promise.all([
      jwPlayerAssets.load(),
      this.getVideoData(),
    ]).then(([, videoData]) => {
      if (!this.isDestroyed) {
        window.wikiaJWPlayer(
          this['element-id'],
          this.getPlayerSetup(videoData),
          this.playerCreated.bind(this),
        );
      }
    });
  },

  playerCreated(playerInstance) {
    playerInstance.on('captionsSelected', ({ selectedLang }) => {
      window.Cookies.set(this.captionsCookieName, selectedLang, {
        expires: this.playerCookieExpireDays,
        path: '/',
        domain: config.APP.cookieDomain,
      });
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
      selectedCaptionsLanguage: window.Cookies.get(this.captionsCookieName),
      settings: {
        showCaptions: true,
      },
      videoDetails: {
        description: jwVideoData.description,
        title: jwVideoData.title,
        playlist: jwVideoData.playlist,
      },
    };
  },

  getVideoData() {
    return fetch(`${this.jwVideoDataUrl}${this['media-id']}`).then(response => response.json());
  },
});
