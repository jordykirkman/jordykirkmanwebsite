define(
	// Dependencies
	[
		'ember',
		'emberdata',
		'js/routes/application/application',
	],
	
function() {

	App.Gaming = DS.Model.extend({
		diablo: DS.belongsTo('diablo'),
		starcraft: DS.belongsTo('starcraft'),
	});

	App.Diablo = DS.Model.extend({
		lastHeroPlayed: DS.belongsTo('diabloHero'),
		diabloHeroes: DS.hasMany('diabloHero'),
		monsterKills: DS.attr('number'),
		eliteKills: DS.attr('number'),
	});
	App.DiabloHero = DS.Model.extend({
		class: DS.attr('string'),
		level: DS.attr('string'),
	});

	App.Starcraft = DS.Model.extend({
		portrait: DS.attr('string'),
	});

});