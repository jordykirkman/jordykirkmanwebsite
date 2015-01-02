define(
	// Dependencies
	[
		'ember',
		'emberdata',
		'js/routes/application/application',
	],
	
function() {

	App.DotaHero = DS.Model.extend({
		localized_name: DS.attr('string'),
	});
	App.Match = DS.Model.extend({
		hero: DS.belongsTo('dotaHero'),
		heroes: DS.hasMany('dotaHero')
	});

});