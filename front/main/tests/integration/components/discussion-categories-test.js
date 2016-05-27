import hbs from 'htmlbars-inline-precompile';
import {asyncTest, test, moduleForComponent} from 'ember-qunit';

moduleForComponent('discussion-categories', 'Integration | Component | discussion categories component', {
	integration: true,
});

function getCategories(count) {
	const categories = [];

	for (let i = 0; i < count; i++) {
		categories.pushObject({
			collapsed: false,
			description: `description ${i}`,
			displayOrder: i,
			id: i,
			name: `name${i}`,
			selected: false,
		});
	}

	return categories;
}

test('category list not collapsed by default', function (assert) {
	this.set('categories', getCategories(20));

	this.render(hbs`{{discussion-categories categories=categories}}`);

	assert.notOk(this.$('.discussion-categories').hasClass('collapsed'));
});


test('category list collapsed after click on header', function (assert) {
	this.set('categories', getCategories(20));

	this.render(hbs`{{discussion-categories categories=categories}}`);

	this.$('legend').click();

	assert.ok(this.$('.discussion-categories').hasClass('collapsed'));
});


test('should display up to 10 categories by default', function (assert) {
	this.set('categories', getCategories(20));

	this.render(hbs`{{discussion-categories categories=categories}}`);

	// 11 = 10 categories + All
	assert.equal(this.$('li').length, 11);
});

test('should display all categories after click "more categories"', function (assert) {
	this.set('categories', getCategories(20));

	this.render(hbs`{{discussion-categories categories=categories}}`);

	this.$('button').click();

	// 21 = 20 categories + All
	assert.equal(this.$('li:not(.hidden)').length, 21);
});

test('should select "All" by default', function (assert) {
	this.set('categories', getCategories(20));

	this.render(hbs`{{discussion-categories categories=categories}}`);

	assert.ok(this.$('label[for="all"] span').hasClass('active-element-background-color'));
});

test('should deselect "All" after selecting other', function (assert) {
	this.set('categories', getCategories(20));

	this.render(hbs`{{discussion-categories categories=categories}}`);

	this.$('label:last').click();

	assert.ok(this.$('label:last span').hasClass('active-element-background-color'));
	assert.notOk(this.$('label[for="all"] span').hasClass('active-element-background-color'));
});

test('should deselect category after selecting "All"', function (assert) {
	this.set('categories', getCategories(20));

	this.render(hbs`{{discussion-categories categories=categories}}`);

	this.$('label:last').click();
	this.$('label[for="all"]').click();

	assert.notOk(this.$('label:last span').hasClass('active-element-background-color'));
	assert.ok(this.$('label[for="all"] span').hasClass('active-element-background-color'));
});

