define(
	// Dependencies
	[
		'ember',
		'js/routes/application/application'
	],
	
function() {

	App.imageViewer = Ember.View.extend({
		tagName: 'img',
		classNames: ['thumbnail'],
		attributeBindings: ['src', 'alt'],
		src: function(){
			return './images/' + this.get('path') + '/' + this.get('thumb');
		}.property(),
		click: function(event) {
			// console.log(this.get('lightbox'));
			// this.toggleProperty('lightbox');
			var path = './images/' + this.get('path') + '/' + this.get('full');
			App.set('lightboxImage', path);
			App.toggleProperty('lightbox');
		},
		// template: Ember.Handlebars.compile('{{#link-to "art.lightbox" view.model}}<img class="lightbox-img" {{bind-attr src="view.src"}}/>{{/link-to}}')
	});

});