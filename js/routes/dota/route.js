define(
	// Dependencies
	[
		'ember',
		'emberdata',
		'js/routes/application/application',
	],
	
function() {

	App.DotaRoute = App.ScrollerRoute.extend({
		prev: 'gaming',
		next: 'art',
		past: 'dota',
		link: {'name': 'Dota', 'link': 'dota'},

		model: function(params) {
			// var url = 'apihandler.php';
			var model = this.store.find('match');
			// console.log(model);
			return model;
		},
		setupController: function(controller, model){
			controller.set('model', model);
		},

	});

});