import { inject as service } from '@ember/service';
import { readOnly, reads, oneWay, and } from '@ember/object/computed';
import Component from '@ember/component';
import { on } from '@ember/object/evented';
import { observer, computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import RespondsToScroll from 'ember-responds-to/mixins/responds-to-scroll';
import VideoLoader from '../modules/video-loader';
import extend from '../utils/extend';
import { transparentImageBase64 } from '../utils/thumbnail';
import config from '../config/environment';
import duration from '../utils/duration';
import JWPlayerMixin from '../mixins/jwplayer';
import { inGroup } from '../modules/abtest';
import { track, trackActions } from '../utils/track';

export default Component.extend(JWPlayerMixin, RespondsToScroll, {
  ads: service(),
  logger: service(),
  wikiVariables: service(),

  classNames: ['article-featured-video'],
  classNameBindings: ['isOnScrollActive'],

  attributionAvatarUrl: transparentImageBase64,
  isOnScrollActive: false,
  isOnScrollClosed: false,
  bodyOnScrollActiveClass: 'featured-video-on-scroll-active',
  onScrollVideoWrapper: null,

  initialVideoDetails: readOnly('model.embed.jsParams.playlist.0'),
  currentVideoDetails: oneWay('initialVideoDetails'),
  metadata: reads('model.metadata'),
  placeholderImage: readOnly('initialVideoDetails.image'),
  hasAttribution: and('currentVideoDetails.{username,userUrl,userAvatarUrl}'),

  // initial video duration is in seconds, related video duration is a formatted string `MM:SS`
  videoDuration: computed('currentVideoDetails', function () {
    const currentVideoDuration = this.get('currentVideoDetails.duration');

    if (this.currentVideoDetails === this.initialVideoDetails) {
      return duration(currentVideoDuration);
    }

    return currentVideoDuration;
  }),

  placeholderStyle: computed('placeholderImage', function () {
    return htmlSafe(`background-image: url(${this.placeholderImage})`);
  }),

  init() {
    this._super(...arguments);

    this.set('videoContainerId', `jwplayer-article-video-${new Date().getTime()}`);
  },

  didInsertElement() {
    this._super(...arguments);

    M.trackingQueue.push(() => {
      this.destroyVideoPlayer();
      this.initVideoPlayer();
    });

    if (this.hasAttribution) {
      this.set('attributionAvatarUrl', this.get('currentVideoDetails.userAvatarUrl'));
    }

    this.set('onScrollVideoWrapper', this.element.querySelector('.article-featured-video__on-scroll-video-wrapper'));

    this.setPlaceholderDimensions();
    window.addEventListener('orientationchange', () => {
      if (this.isInLandscapeMode()) {
        this.onScrollStateChange('inactive');
      }
    });
    document.body.classList.add(this.bodyOnScrollActiveClass);
  },

  didUpdateAttrs() {
    this.destroyVideoPlayer();
    this.initVideoPlayer();
  },

  willDestroyElement() {
    document.body.classList.remove(this.bodyOnScrollActiveClass);
    this.destroyVideoPlayer();
  },

  actions: {
    dismissPlayer() {
      this.set('isOnScrollClosed', true);
      this.onScrollStateChange('closed');

      if (this.player) {
        this.player.setMute(true);
      }
      document.body.classList.remove(this.bodyOnScrollActiveClass);

      // this.scrollHandler is from ember-responds-to - there is no public API to
      // remove a scroll handler now
      window.removeEventListener('scroll', this.scrollHandler);
    },

    clickAttribution() {
      track({
        action: trackActions.click,
        category: 'featured-video',
        label: this.get('currentVideoDetails.username'),
      });
    },
  },

  /**
	 * @param {Object} player
	 * @returns {void}
	 */
  onCreate(player) {
    this.player = player;

    this.player.on('autoplayToggle', ({ enabled }) => {
      this.setCookie(this.autoplayCookieName, (enabled ? '1' : '0'));
    });

    this.player.on('captionsSelected', ({ selectedLang }) => {
      this.setCookie(this.captionsCookieName, selectedLang);
    });

    this.player.on('relatedVideoPlay', ({ item }) => {
      this.set('currentVideoDetails', item);
    });

    // this is a hack to fix pause/play issue while scrolling down and on scroll is active on iOS 10.3.2
    this.player.on('pause', ({ pauseReason, viewable }) => {
      if (pauseReason === 'autostart' && viewable === 0 && this.isOnScrollActive) {
        this.player.play();
      }
    });

    this.player.on('adPause', ({ viewable }) => {
      if (viewable === 0 && this.isOnScrollActive) {
        this.player.play();
      }
    });

    // to make sure custom dimension is set and tracking event is sent
    let onScrollState = this.isOnScrollActive ? 'active' : 'inactive';
    if (this.isOnScrollClosed) {
      onScrollState = 'closed';
    }
    this.onScrollStateChange(onScrollState);

    this.resizeVideo = this.resizeVideo.bind(this);
    this.onScrollVideoWrapper.addEventListener('transitionend', this.resizeVideo);
  },

  /**
	 * @returns {void}
	 */
  initVideoPlayer() {
    const model = this.get('model.embed');
    const jsParams = {
      autoplay: !inGroup('FV_CLICK_TO_PLAY', 'CLICK_TO_PLAY')
				&& window.Cookies.get(this.autoplayCookieName) !== '0',
      selectedCaptionsLanguage: window.Cookies.get(this.captionsCookieName),
      adTrackingParams: {
        adProduct: this.get('ads.noAds') ? 'featured-video-no-preroll' : 'featured-video-preroll',
        slotName: 'FEATURED',
      },
      containerId: this.videoContainerId,
      noAds: this.get('ads.noAds'),
      onCreate: this.onCreate.bind(this),
      lang: this.get('wikiVariables.language.content'),
    };
    const data = extend({}, model, {
      jsParams,
    });
    const videoLoader = new VideoLoader(data);

    videoLoader.loadPlayerClass();
  },

  /**
	 * @returns {void}
	 */
  destroyVideoPlayer() {
    if (this.player) {
      // FIXME this is temporary solution to fix nested glimmer transaction exception which causes application break
      // more info in XW-4600
      try {
        this.player.remove();
      } catch (e) {
        this.logger.warn(e);
      }
    }
  },

  setCookie(cookieName, cookieValue) {
    window.Cookies.set(cookieName, cookieValue, {
      expires: this.playerCookieExpireDays,
      path: '/',
      domain: config.APP.cookieDomain,
    });
  },

  resizeVideo() {
    this.player.resize();
  },

  scroll() {
    if (!this.element) {
      return;
    }

    const currentScrollPosition = window.pageYOffset;
    const globalNavigationHeight = document.querySelector('.wds-global-navigation').offsetHeight;
    const requiredScrollDelimiter = this.element.getBoundingClientRect().top + window.scrollY - globalNavigationHeight;
    const isOnScrollActive = this.isOnScrollActive;
    const isInLandscapeMode = this.isInLandscapeMode();

    if (!isInLandscapeMode) {
      if (currentScrollPosition >= requiredScrollDelimiter && !isOnScrollActive) {
        this.onScrollStateChange('active');
      } else if (currentScrollPosition < requiredScrollDelimiter && isOnScrollActive) {
        this.onScrollStateChange('inactive');
      }
    }
  },

  setPlaceholderDimensions() {
    const placeHolder = this.element.querySelector('.article-featured-video__on-scroll-placeholder');
    const videoContainer = this.element.children[0];

    placeHolder.style.height = `${videoContainer.offsetHeight}px`;
    placeHolder.style.width = `${videoContainer.offsetWidth}px`;
  },

  onScrollStateChange(state) {
    this.set('isOnScrollActive', state === 'active');
    if (this.player) {
      this.player.trigger('onScrollStateChanged', { state });
    }
  },

  isInLandscapeMode() {
    return Math.abs(window.orientation) === 90;
  },
});
