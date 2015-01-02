define(
	// Dependencies
	[
		'ember',
		'emberdata',
		'js/routes/application/application',
	],
	
function() {

	App.ArtRoute = App.ScrollerRoute.extend({
		prev: 'dota',
		next: 'dev',
		past: 'art',
		link: {'name': 'Art', 'link': 'art'},
	});

});