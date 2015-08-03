/// <reference path="../app.ts" />
/// <reference path="../mixins/ObjectUtilitiesMixin.ts" />
'use strict';

type CuratedContentEditorItemModel = typeof App.CuratedContentEditorItemModel;

App.CuratedContentEditorItemModel = Em.Object.extend(App.ObjectUtilitiesMixin, {
	article_id: null,
	image_id: null,
	image_url: null,
	items: null,
	label: null,
	node_type: null,
	title: null,
	type: null
});

interface CuratedContentGetImageResponse {
	url: string;
	id: number;
}

App.CuratedContentEditorItemModel.reopenClass({
	// Object Model instance is only created once and all create() method invocations return already created object.
	// Using extend prevents from sharing ember metadata between instances so each time fresh object instance is created.
	createNew(params: any = {}): CuratedContentEditorItemModel {
		var modelParams = $.extend(true, {
			article_id: null,
			image_id: null,
			image_url: null,
			items: null,
			label: null,
			node_type: null,
			title: null,
			type: null
		}, params);

		return App.CuratedContentEditorItemModel.create(modelParams);
	},

	getImage(title: string, size: number): Em.RSVP.Promise {
		return new Em.RSVP.Promise((resolve: Function, reject: Function): void => {
			Em.$.ajax({
				url: M.buildUrl({
					path: '/wikia.php',
				}),
				data: {
					controller: 'CuratedContent',
					method: 'getImage',
					title,
					size,
				},
				dataType: 'json',
				success: (data: CuratedContentGetImageResponse): void => {
					resolve(data);
				},
				error: (err: any): void => {
					reject(err);
				}
			});
		});
	},

	validateServerData(item: CuratedContentEditorItemModel, data: any) : Em.RSVP.Promise {
		data = $.extend({}, data, {
			controller: 'CuratedContentValidator',
			item: item.toJSON(),
			format: 'json'
		});

		return new Em.RSVP.Promise((resolve: Function, reject: Function): void => {
			Em.$.ajax({
				url: M.buildUrl({
					path: '/wikia.php'
				}),
				data,
				dataType: 'json',
				success: (data: CuratedContentValidationResponseInterface): void => {
					resolve(data);
				},
				error: (data: any): void => {
					reject(data);
				}
			});
		});
	},

	validateItem(item: CuratedContentEditorItemModel, isFeatured: boolean) : Em.RSVP.Promise {
		return this.validateServerData(item, {
			method: 'validateItem',
			isFeatured
		});
	},

	validateSection(item: CuratedContentEditorItemModel, validateItems: boolean) : Em.RSVP.Promise {
		return this.validateServerData(item ,{
			method: 'validateSection',
			validateItems
		});
	}
});
