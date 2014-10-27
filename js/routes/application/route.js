define(
	// Dependencies
	[
		'ember',
		'js/routes/application/application',
	],
	
function() {

	App.IndexRoute = Ember.Route.extend({
		activate: function(){
			this.transitionTo('instagram');
		},

	});


});