define(
	// Dependencies
	[
		'ember',
		'emberdata',
		'js/routes/application/application',
	],
	
function() {

	App.InstagramRoute = App.ScrollerRoute.extend({
		prev: null,
		next: 'dota',
		past: 'instagram',
		link: {'name': 'Instagram', 'link': 'instagram'},

		model: function(params) {
			// var url = 'apihandler.php';
			var model = this.store.find('instagram');
			return model;
		},
		setupController: function(controller, model){
			var emptyObj = this.store.createRecord('instagram', {standardResolution: ""});
			model.insertAt(0, emptyObj);
			controller.set('model', model);
			var set = model.objectsAt([0, 1, 2]);
			controller.set('currentSet', []);
			controller.get('currentSet').pushObjects(set);
		},

	});

});