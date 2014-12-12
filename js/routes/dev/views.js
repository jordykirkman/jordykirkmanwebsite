define(
	// Dependencies
	[
		'ember',
		'js/routes/application/application'
	],
	
function() {

	App.BarGraph = Ember.CollectionView.extend({
		classNames: ['graph'],
		content: Ember.A([
			{level: 80, name: 'Sass, Css3, HTML5'},
			{level: 90, name: 'Javascript'},
			{level: 90, name: 'Ember.js'},
			{level: 60, name: 'PHP'},
			{level: 40, name: 'Node.js'},
			{level: 20, name: 'Java'},
			{level: 10, name: 'Hearthstone'}
		]),
		barWidth: function(){
			var count = this.get('content.length');
			return (100 - count) / this.get('content.length');
		}.property('this.count'),
		itemViewClass: Ember.View.extend({
			attributeBindings: ['style'],
			classNames: ['bar'],
			style: function(){
				return 'height: ' + this.get('content.level') + '%; width: ' + this.get('parentView.barWidth') + '%; top: ' + (100 - this.get('content.level')) + '%;';
			}.property('this.content.level'),
			template: Ember.Handlebars.compile('{{view.content.name}}')
		})
	});

});