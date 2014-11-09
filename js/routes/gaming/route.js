define(
	// Dependencies
	[
		'ember',
		'emberdata',
		'js/routes/application/application',
	],
	
function() {

	App.GamingRoute = App.ScrollerRoute.extend({
		prev: 'instagram',
		next: 'dota',
		past: 'gaming',
		link: {'name': 'Gaming', 'link': 'gaming'},

		model: function(params) {
			// var url = 'apihandler.php';
			var model = this.store.find('gaming', 1);
			// console.log(model);
			return model;
		},
		setupController: function(controller, model){
			controller.set('model', model);
		},

	});

	App.GamingLoadingRoute = Ember.Route.extend({
	});
	var LoadTemplate = Ember.Handlebars.compile('<div class="loading"><img src="./images/hydra_loading.gif"/></div>');
	App.register( 'template:gaming.loading', LoadTemplate );

});