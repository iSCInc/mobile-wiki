import { find, findAll, render } from '@ember/test-helpers';
import Component from '@ember/component';
import Service from '@ember/service';
import { dasherize } from '@ember/string';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';
import sinon from 'sinon';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import RenderComponentMixin from 'mobile-wiki/mixins/render-component';

import * as adsModule from 'mobile-wiki/modules/ads';
import mockAdsService, { getAdsModuleMock } from '../../helpers/mock-ads-service';

const adSlotComponentStub = Component.extend(RenderComponentMixin, {
  classNameBindings: ['nameLowerCase'],
  nameLowerCase: computed('name', function () {
    return dasherize(this.get('name').toLowerCase());
  }),
});
const i18nService = Service.extend({
  t() {},
});

module('Integration | Component | article content', (hooks) => {
  setupRenderingTest(hooks);
  let adsModuleStub;

  hooks.beforeEach(function () {
    adsModuleStub = sinon.stub(adsModule, 'default').returns({ then: cb => cb(getAdsModuleMock()) });
    this.owner.register('component:ad-slot', adSlotComponentStub);
    this.owner.register('service:i18n', i18nService);
    mockAdsService(this.owner);
  });

  hooks.afterEach(() => {
    adsModuleStub.restore();
  });

  const mobileTopLeaderboardSelector = '.mobile-top-leaderboard';

  test('ad is injected below portable infobox with no page header', async function (assert) {
    const content =	'<p>some content</p>'
			+ '<div class="portable-infobox-wrapper">'
			+ '<aside class="portable-infobox"></aside>'
			+ '</div>'
			+ '<section>Article body</section>'
			+ '<div>more content</div>';
    const setupAdsContextSpy = sinon.spy();

    this.setProperties({
      adsContext: {
        opts: {
          areMobileStickyAndSwapEnabled: false,
        },
      },
      content,
      setupAdsContext: setupAdsContextSpy,
    });

    this.owner.lookup('component:article-content').get('ads.module').isLoaded = true;

    await render(hbs`{{#article-content
			setupAdsContext=setupAdsContext
			content=content
			adsContext=adsContext
		}}{{/article-content}}`);

    assert.equal(findAll(mobileTopLeaderboardSelector).length, 1);
    assert.equal(
      find(mobileTopLeaderboardSelector).previousSibling,
      find('.portable-infobox-wrapper'),
      'previous element is an infobox',
    );
  });

  test('ad is injected below page header', async function (assert) {
    const content =	'<p>some content</p>'
			+ '<aside class="wiki-page-header"></aside>'
			+ '<section>Article body</section>'
			+ '<div>more content</div>';
    const setupAdsContextSpy = sinon.spy();

    this.setProperties({
      adsContext: {
        opts: {
          areMobileStickyAndSwapEnabled: false,
        },
      },
      content,
      setupAdsContext: setupAdsContextSpy,
    });

    this.owner.lookup('component:article-content').get('ads.module').isLoaded = true;

    await render(hbs`{{#article-content
			setupAdsContext=setupAdsContext
			content=content
			adsContext=adsContext
		}}{{/article-content}}`);

    assert.equal(findAll(mobileTopLeaderboardSelector).length, 1);
    assert.equal(
      find(mobileTopLeaderboardSelector).previousSibling,
      find('.wiki-page-header'),
      'previous element is site header',
    );
  });

  test('ad is injected below portable infobox', async function (assert) {
    const content =	'<p>some content</p>'
			+ '<div class="wiki-page-header"></div>'
			+ '<div class="portable-infobox-wrapper">'
			+ '<aside class="portable-infobox"></aside>'
			+ '</div>'
			+ '<section>Article body</section>'
			+ '<div>more content</div>';
    const setupAdsContextSpy = sinon.spy();

    this.setProperties({
      adsContext: {
        opts: {
          areMobileStickyAndSwapEnabled: false,
        },
      },
      content,
      setupAdsContext: setupAdsContextSpy,
    });

    this.owner.lookup('component:article-content').get('ads.module').isLoaded = true;

    await render(hbs`{{#article-content
			setupAdsContext=setupAdsContext
			content=content
			adsContext=adsContext
		}}{{/article-content}}`);

    assert.equal(findAll(mobileTopLeaderboardSelector).length, 1, 'top leaderboard is inserted only once');
    assert.equal(
      find(mobileTopLeaderboardSelector).previousSibling,
      find('.portable-infobox-wrapper'),
      'previous element is an infobox',
    );
  });
});
