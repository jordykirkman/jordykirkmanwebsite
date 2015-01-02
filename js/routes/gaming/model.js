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
		heroes: DS.hasMany('diabloHero'),
		monsterKills: DS.attr('number'),
		eliteKills: DS.attr('number'),
	});
	App.DiabloHero = DS.Model.extend({
		class: DS.attr('string'),
		level: DS.attr('string'),
		name: DS.attr('string'),
		paragonLevel: DS.attr('string'),
		mainHandIcon: DS.attr('string'),
		mainHandName: DS.attr('string'),
		mainHandColor: DS.attr('string'),
		headIcon: DS.attr('string'),
		headName: DS.attr('string'),
		headColor: DS.attr('string'),
		mainHandImage: function(){
			var icon = this.get('mainHandIcon');
			return "http://media.blizzard.com/d3/icons/items/large/" + icon + ".png"
		}.property('mainHandIcon'),
		headImage: function(){
			var icon = this.get('headIcon');
			return "http://media.blizzard.com/d3/icons/items/large/" + icon + ".png"
		}.property('headIcon')
	});

	App.Starcraft = DS.Model.extend({
		portrait: DS.attr('string'),
	});

});