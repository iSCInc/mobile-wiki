import Ember from 'ember';
import DiscussionEditor from './discussion-editor';
import DiscussionEditorOpengraph from '../mixins/discussion-editor-opengraph';

export default DiscussionEditor.extend(DiscussionEditorOpengraph, {
	classNames: ['discussion-standalone-editor'],

	currentUser: Ember.inject.service(),

	isEdit: Ember.computed.notEmpty('editEntity'),
	editorType: Ember.computed('idEdit', function () {
		return this.get('isEdit') ? 'editEditor' : 'contributeEditor';
	}),
	editEntity: null,

	editEntityObserver: Ember.observer('editEntity', function () {
		const editEntity = this.get('editEntity');

		this.setProperties({
			content: editEntity.get('rawContent'),
			openGraph: editEntity.get('openGraph'),
			showsOpenGraphCard: Boolean(editEntity.get('openGraph'))
		});

		Ember.run.scheduleOnce('afterRender', this, () => {
			// This needs to be triggered after Ember updates textarea content
			this.$('.discussion-standalone-editor-textarea').focus().get(0).setSelectionRange(0, 0);
		});
	}),

	textAreaId: Ember.computed('isEdit', function () {
		if (this.get('isEdit')) {
			return 'discussion-standalone-edit-editor-textarea';
		} else {
			return 'discussion-standalone-editor-textarea';
		}
	}),

	actions: {
		close() {
			this._super();

			this.sendAction('setEditorActive', this.get('isEdit') ? 'editEditor' : 'contributeEditor', false);
		},

		submit() {
			if (!this.get('submitDisabled')) {
				const discussionEntityData = {
					body: this.get('content'),
				};
				let actionName;

				if (this.get('showsOpenGraphCard')) {
					discussionEntityData.openGraph = {
						uri: this.get('openGraph.href')
					};
				}

				if (!this.get('isEdit')) {
					actionName = 'create';
					discussionEntityData.creatorId = this.get('currentUser.userId');
					discussionEntityData.siteId = Mercury.wiki.id;
				} else {
					const editEntity = this.get('editEntity');

					if (editEntity.get('isReply')) {
						actionName = 'editReply';
						discussionEntityData.id = editEntity.get('id');
					} else {
						actionName = 'editPost';
						discussionEntityData.id = editEntity.get('threadId');
					}
				}

				this.sendAction(actionName, discussionEntityData);
			}
		},
	}
});
