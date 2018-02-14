import Service from '@ember/service';
import sinon from 'sinon';
import hbs from 'htmlbars-inline-precompile';
import require from 'require';
import {test, moduleForComponent} from 'ember-qunit';
import {find, findAll} from 'ember-native-dom-helpers';

const trackModule = require('mobile-wiki/utils/track');
let trackStub;

const wikiaSearchDivSelector = '.wikia-search',
	focusedInputClass = 'wikia-search--focused',
	hasSuggestionsClass = 'wikia-search--has-suggestions';

const i18nStub = Service.extend({
	t(key) {
		return key;
	}
});

moduleForComponent('wikia-search', 'Integration | Component | wikia search', {
	integration: true,

	beforeEach() {
		trackStub = sinon.stub(trackModule, 'track');
		this.register('service:i18n', i18nStub);
		this.inject.service('i18n', {as: 'i18nService'});
	},

	afterEach() {
		trackStub.restore();
	}
});

test('search displayed correctly with default settings', function (assert) {
	this.render(hbs`{{wikia-search}}`);

	const wikiaSearchClass = find(wikiaSearchDivSelector).className;

	assert.equal(
		wikiaSearchClass.indexOf(focusedInputClass),
		-1,
		`wikia-search doesn't have ${focusedInputClass} class`
	);
	assert.equal(
		wikiaSearchClass.indexOf(hasSuggestionsClass),
		-1,
		`wikia-search doesn't have ${hasSuggestionsClass} class`
	);
});

test('search input has correct classes when inputFocused=true', function (assert) {
	this.render(hbs`
	{{wikia-search
		inputFocused=true
	}}`);

	const wikiaSearchClass = find(wikiaSearchDivSelector).className;

	assert.notEqual(
		wikiaSearchClass.indexOf(focusedInputClass),
		-1,
		`wikia-search has ${focusedInputClass} class`
	);
	assert.equal(
		wikiaSearchClass.indexOf(hasSuggestionsClass),
		-1,
		`wikia-search doesn't have ${hasSuggestionsClass} class`
	);
});

test('display div with loading search suggestions', function (assert) {
	this.render(hbs`{{wikia-search
		isLoadingResultsSuggestions=true
	}}`);

	assert.equal(findAll('.wikia-search__loading').length, 1);
});

test('display div with loading search suggestions', function (assert) {
	const suggestions = [
		{
			uri: 'test1',
			text: 'test1'
		},
		{
			uri: 'test2',
			text: 'test2'
		},
		{
			uri: 'test3',
			text: 'test3'
		},
		{
			uri: 'test4',
			text: 'test4'
		}
	];

	this.render(
		hbs`{{wikia-search
			suggestions=suggestions
		}}`
	);
	this.set('suggestions', suggestions);

	assert.equal(findAll('.wikia-search__search-suggestion').length, suggestions.length);
});
