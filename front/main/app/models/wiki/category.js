import Ember from 'ember';
import MediaModel from '../media';
import {normalizeToWhitespace} from 'common/utils/string';

const {Object, get, $, isArray} = Ember,
	keys = window.Object.keys,
	CategoryModel = Object.extend({
		collections: null,
		basePath: null,
		categories: [],
		displayTitle: null,
		comments: 0,
		description: null,
		media: [],
		mediaUsers: [],
		otherLanguages: [],
		title: null,
		url: null,
		user: null,
		users: [],
		wiki: null,
		name: null,
		hasArticle: false,
		ns: null,
		id: null,

		loadMore(index, batchToLoad) {
			const url = CategoryModel.getUrlBatchContent(this.get('name'), index, batchToLoad);

			return $.ajax({
				url,
				dataType: 'json',
				method: 'get',
			}).then((pageData) => {
				const collectionIndex = `collections.${index}`;

				this.setProperties({
					[`${collectionIndex}.items`]: CategoryModel.addTitles(pageData.itemsBatch),
					[`${collectionIndex}.hasPrev`]: batchToLoad - 1 > 0,
					[`${collectionIndex}.hasNext`]: Math.ceil(this.get(`${collectionIndex}.total`) /
						this.get(`${collectionIndex}.batchSize`)) > batchToLoad,
					[`${collectionIndex}.prevBatch`]: batchToLoad - 1,
					[`${collectionIndex}.nextBatch`]: batchToLoad + 1
				});

				return this;
			});
		}
	});

CategoryModel.reopenClass({
	/**
	 * @param {CategoryModel} model
	 * @param {Object} pageData
	 * @returns {void}
	 */
	setCategory(model, pageData) {
		const exception = pageData.exception,
			data = pageData.data;

		let pageProperties = {},
			details,
			article;

		if (exception) {
			pageProperties = {
				displayTitle: normalizeToWhitespace(model.title),
				exception
			};
		} else if (data) {
			if (data.details) {
				details = data.details;

				pageProperties = {
					ns: details.ns,
					id: details.id,
					user: details.revision.user_id,
					url: details.url,
					description: details.description
				};
			}

			pageProperties.name = get(data, 'nsData.name');
			pageProperties.displayTitle = get(data, 'nsData.name');

			if (data.article) {
				article = data.article;

				if (article.content.length > 0) {
					pageProperties = $.extend(pageProperties, {
						content: article.content,
						mediaUsers: article.users,
						type: article.type,
						media: MediaModel.create({
							media: article.media
						}),
						categories: article.categories,
						redirectEmptyTarget: data.redirectEmptyTarget || false,
						hasArticle: true
					});
				} else {
					pageProperties.hasArticle = false;
				}
			}

			pageProperties.collections = CategoryModel.addTitles(get(data, 'nsData.members.collections'));

			if (data.otherLanguages) {
				pageProperties.otherLanguages = data.otherLanguages;
			}

			if (data.adsContext) {
				pageProperties.adsContext = data.adsContext;

				if (pageProperties.adsContext.targeting) {
					pageProperties.adsContext.targeting.mercuryPageCategories = pageProperties.categories;
				}
			}

			// @todo this will be cleaned up in XW-1053
			pageProperties.articleType = pageProperties.type || data.articleType;
		}

		model.setProperties(pageProperties);
	},

	/**
	 * Get url for batch of category members for given index.
	 * Index represents the letter members start from.
	 *
	 * @param {String} categoryName
	 * @param {String} index
	 * @param {Number} batch
	 * @returns {string}
	 */
	getUrlBatchContent(categoryName, index, batch) {
		const query = {
			controller: 'WikiaMobile',
			method: 'getCategoryBatch',
			batch,
			category: categoryName,
			format: 'json',
			isMercury: true,
			index
		};

		return M.buildUrl({
			path: '/wikia.php',
			query
		});
	},

	/**
	 * add title to collectionItem based on url eg. /wiki/Namespace:Title -> Namespace:Title
	 *
	 * @param  {Array.<{url: string, name: string}>} collectionItems - array of items
	 * @returns {Array.<{url: string, name: string, title: string}>}
	 */
	addTitlesToCollection(collectionItems) {
		return collectionItems.map((item) => {
			item.title = item.url.replace('/wiki/', '');

			return item;
		});
	},

	/**
	 * Adds titles to collection
	 * When used in loadMore context it has access only to one batch array
	 * when used in setCategory context it has to iterate over object that contains
	 * all batches for a given category
	 *
	 * TODO - this should be done server side XW-1165
	 *
	 * @param {Object|Array} collections
	 * @returns {Object|Array}
	 */
	addTitles(collections) {
		if (isArray(collections)) {
			collections = CategoryModel.addTitlesToCollection(collections);
		} else {
			keys(collections).forEach((collectionKey) => {
				const collectionItem = collections[collectionKey];

				collectionItem.items = CategoryModel.addTitlesToCollection(collectionItem.items);
			});
		}

		return collections;
	}
});

export default CategoryModel;
