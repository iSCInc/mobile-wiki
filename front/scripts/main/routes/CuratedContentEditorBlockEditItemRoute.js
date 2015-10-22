App.CuratedContentEditorBlockEditItemRoute = Em.Route.extend({
	/**
	 * @param {Object} params
	 * @returns {CuratedContentEditorItemModel} item
	 */
	model(params) {
		const block = params.block,
			item = decodeURIComponent(params.item),
			rootModel = this.modelFor('curatedContentEditor'),
			blockModel = rootModel[block];

		return App.CuratedContentEditorModel.getItem(blockModel, item);
	},

	/**
	 * @param {Object} controller
	 * @param {CuratedContentEditorItemModel} model
	 * @param {EmberState.Transition} transition
	 * @returns {undefined}
	 */
	setupController(controller, model, transition) {
		const block = transition.params['curatedContentEditor.blockEditItem'].block,
			rootModel = this.modelFor('curatedContentEditor'),
			alreadyUsedLabels = (block === 'optional') ?
				App.CuratedContentEditorModel.getAlreadyUsedNonFeaturedItemsLabels(rootModel, model.label) :
				App.CuratedContentEditorModel.getAlreadyUsedLabels(rootModel.get(block), model.label);

		this._super(controller, model, transition);
		controller.setProperties({
			alreadyUsedLabels,
			block,
			isFeaturedItem: block === 'featured',
			originalItemLabel: model.label
		});
	},

	/**
	 * @returns {undefined}
	 */
	renderTemplate() {
		this.render('curated-content-editor-item');
	},

	actions: {
		/**
		 * @returns {undefined}
		 */
		goBack() {
			this.transitionTo('curatedContentEditor.index');
		},

		/**
		 * @param {CuratedContentEditorItemModel} newItem
		 * @returns {undefined}
		 */
		done(newItem) {
			const controller = this.controllerFor('curatedContentEditor.blockEditItem'),
				block = controller.get('block'),
				originalItemLabel = controller.get('originalItemLabel'),
				rootModel = this.modelFor('curatedContentEditor'),
				blockModel = rootModel[block];

			App.CuratedContentEditorModel.updateItem(blockModel, newItem, originalItemLabel);
			this.transitionTo('curatedContentEditor.index');
		},

		/**
		 * @returns {undefined}
		 */
		deleteItem() {
			const controller = this.controllerFor('curatedContentEditor.blockEditItem'),
				block = controller.get('block'),
				item = controller.get('originalItemLabel'),
				rootModel = this.modelFor('curatedContentEditor'),
				blockModel = rootModel[block];

			App.CuratedContentEditorModel.deleteItem(blockModel, item);
			this.transitionTo('curatedContentEditor.index');
		}
	}
});
