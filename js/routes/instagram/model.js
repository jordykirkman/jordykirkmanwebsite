define(
	// Dependencies
	[
		'ember',
		'emberdata',
		'js/routes/application/application',
	],
	
function() {

	App.Instagram = DS.Model.extend({
		lowResolution: DS.attr('string'),
		standardResolution: DS.attr('string'),
		thumbnail: DS.attr('string'),
		caption: DS.attr('string'),
		likes: DS.attr('number'),
	});

});