define(
	// Dependencies
	[
		'ember',
		'js/routes/application/application'
	],
	
function() {

	App.dotaHeroView = Ember.View.extend({
		attributeBindings: ['style'],
		classNames: ['dota-hero-image-thumb'],
		classNameBindings: ['name'],
		name: function(){
			return this.get('context.hero').get('localized_name');
		}.property(),
		style: function(){
			var context = this.get('context.hero');
			var id = context.get('id') - 1;
			var top = ((id - (Math.floor(id/10) * 10)) * 72);
			var left = Math.floor(id / 10) * 128;
			return 'background-position: -' + left + 'px -' + top + 'px;';
		}.property(),
		template: Ember.Handlebars.compile('{{view.name}}')
	});

	App.dotaHeroesView = Ember.View.extend({
		attributeBindings: ['style'],
		classNames: ['dota-hero-image-thumb'],
		classNameBindings: ['name'],
		name: function(){
			return this.get('context').get('localized_name');
		}.property(),
		style: function(){
			var context = this.get('context');
			var id = context.get('id') - 1;
			var top = ((id - (Math.floor(id/10) * 10)) * 72);
			var left = Math.floor(id / 10) * 128;
			return 'background-position: -' + left + 'px -' + top + 'px;';
		}.property(),
		template: Ember.Handlebars.compile('{{view.name}}')
	});

});