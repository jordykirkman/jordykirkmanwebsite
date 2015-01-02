define(
	// Dependencies
	[
		'ember',
		'js/routes/application/application'
	],
	
function() {

	App.BarGraphContainer = Ember.View.extend({
		classNames: ['graph-container'],
		values: Ember.A([
			{name: 'Killing Spree'},
			{name: 'Miltikill'},
			{name: 'Double Kill'},
			{name: 'First Blood'},
			{name: 'Noob'},
		]),
		layout: Ember.Handlebars.compile('\
		<div class="sixteen columns">\
			<ul>\
			{{#each view.values}}\
				<li><h4>{{name}}</h4></li>\
			{{/each}}\
			</ul>\
		</div>\
		<div class="clear"></div>{{yield}}')
	});

	App.BarGraph = Ember.CollectionView.extend({
		classNames: ['graph', 'thirteen', 'columns'],
		content: Ember.A([
			{level: 95, name: 'Problem solving'},
			{level: 90, name: 'Sass, Css3, HTML5'},
			{level: 85, name: 'Javascript'},
			{level: 85, name: 'Ember.js'},
			{level: 55, name: 'PHP'},
			{level: 35, name: 'Node.js'},
			{level: 20, name: 'Java'},
			{level: 15, name: 'Hearthstone'}
		]),
		barWidth: function(){
			var count = this.get('content.length');
			return (100 - count) / this.get('content.length');
		}.property('this.count'),
		itemViewClass: Ember.View.extend({
			attributeBindings: ['style', 'animated'],
			classNames: ['bar'],
			style: function(){
				return 'height: ' + this.get('content.level') + '%; width: ' + this.get('parentView.barWidth') + '%; top: ' + (100 - this.get('content.level')) + '%;';
			}.property('this.content.level'),
			template: Ember.Handlebars.compile('{{view.content.name}}')
		})
	});

});