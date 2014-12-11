define(
	// Dependencies
	[
		'ember',
		'emberdata',
		'js/routes/application/application',
	],
	
function() {

	App.DevRoute = App.ScrollerRoute.extend({
		prev: 'art',
		next: null,
		past: 'dev',
		link: {'name': 'Dev', 'link': 'dev'},
	});

});