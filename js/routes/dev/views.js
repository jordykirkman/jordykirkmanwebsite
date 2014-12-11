define(
	// Dependencies
	[
		'ember',
		'js/routes/application/application'
	],
	
function() {

	App.BarGraph = Ember.CollectionView.extend({
		classNames: ['graph'],
		content: [{level: 20}, {level: 20}, {level: 40}, {level: 50}, {level: 50}, {level: 30} ],

		count: function(){
			return this.get('content').toArray().get('length');
		}.property('this.content'),
		itemViewClass: Ember.View.extend({
			classNames: ['bar'],
			elementStyle: function(){
				
				return 'height: ' + this.get('level') + '%;';
			}.property('this.level'),
			// template: Ember.Handlebars.compile('<div {{bind-attr style="view.style"}}></div>')
		})
	});

});