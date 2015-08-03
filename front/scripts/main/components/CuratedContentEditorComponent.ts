/// <reference path="../app.ts" />
'use strict';

App.CuratedContentEditorComponent = Em.Component.extend({
	classNames: ['curated-content-editor'],

	actions: {
		addBlockItem(block: string): void {
			this.sendAction('addBlockItem', block);
		},

		addSection(): void {
			this.sendAction('addSection');
		},

		editBlockItem(item: CuratedContentEditorItemModel, block: string): void {
			this.sendAction('editBlockItem', item, block);
		},

		openSection(item: CuratedContentEditorItemModel): void {
			this.sendAction('openSection', item);
		}
	}
});
