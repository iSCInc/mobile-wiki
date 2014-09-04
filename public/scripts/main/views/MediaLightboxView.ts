/// <reference path="../app.ts" />
'use strict';

App.MediaLightboxView = App.LightboxView.extend({
	classNames: ['media-lightbox'],

	//opening, open
	//before didInsertElement the lightbox is opening
	status: 'opening',

	keyDown: function(event: JQueryEventObject){
		if (event.keyCode === 39) {
			this.get('controller').incrementProperty('currentGalleryImage')
		} else if (event.keyCode === 37) {
			this.get('controller').decrementProperty('currentGalleryImage')
		}

		this._super(event);
	},

	didInsertElement: function() {
		this.animateMedia(this.get('controller').get('element'));
		this.set('status', 'open');

		this._super();
	},

	animateMedia: function(image?: HTMLElement) {
		if (image) {
			var $image = $(image),
				offset = $image.offset(),
				$imageCopy = $(image).clone();

			//initial style, mimck the image that is in page
			$imageCopy.css({
				position: 'fixed',
				top: offset.top - window.scrollY + 'px',
				left: offset.left + 'px',
				width: $image.width() + 'px',
				height: 'auto',
				transition: 'all .3s'
			});

			this.$().append($imageCopy);

			//animate to full width and middle of screen
			$imageCopy.css({
				width: document.body.offsetWidth + 'px',
				top: this.$('img')[0].offsetTop + 'px',
				left: 0
			}).on('webkitTransitionEnd', function(){
				$imageCopy.remove();
			});
		}
	},

	willDestroyElement: function() {
		this.get('controller').set('file', null);

		this._super();
	}
});

