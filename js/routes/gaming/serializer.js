define(
	// Dependencies
	[
		'ember',
		'emberdata',
		'js/routes/application/application',
	],
	
function() {

	App.GamingSerializer = DS.RESTSerializer.extend({
		extractSingle: function(store, type, payload, id, requestType) {
			console.log(payload);
			var newObj = {};
			newObj['gaming'] = {};
			newObj['gaming']['id'] = 1;

			// lets lets reformat our d3 history
			if(payload.gaming.diablo){
			if(payload.gaming.diablo.heroes){
				var diabloObj = {};
				diabloObj['id'] = 1;
				var diabloHeroIds = payload.gaming.diablo.heroes.mapProperty('id');
				diabloObj['diabloHeroes'] = diabloHeroIds;
				diabloObj['lastHeroPlayed'] = payload.gaming.diablo.lastHeroPlayed;
				diabloObj['monsterKills'] = payload.gaming.diablo.kills.monsters;
				diabloObj['eliteKills'] = payload.gaming.diablo.kills.elites;
				newObj['diablos'] = [];
				newObj['diablos'].pushObject(diabloObj);
				newObj['gaming']['diablo'] = 1;
				payload.gaming.heroes.forEach(function(hero){
					hero['mainHandIcon'] = hero.items.mainHand.icon;
					hero['mainHandName'] = hero.items.mainHand.name;
					hero['mainHandColor'] = hero.items.mainHand.displayColor;
					hero['headIcon'] = hero.items.head.icon;
					hero['headName'] = hero.items.head.name;
					hero['headColor'] = hero.items.head.displayColor;
				});
				newObj['diabloHeroes'] = payload.gaming.heroes;
			}
			}

			// now our starcraft career
			if(payload.gaming.starcraft){
				var scObj = {};
				scObj['id'] = payload.gaming.starcraft.id;
				// scObj['portrait'] = payload.gaming.starcraft.portrait.url;
				newObj['gaming']['starcraft'] = payload.gaming.starcraft.id;
				newObj['starcrafts'] = [];
				newObj['starcrafts'].pushObject(scObj);
			}

			// console.log(newObj);
			return this._super(store, type, newObj, id, requestType);
		},
	});

});