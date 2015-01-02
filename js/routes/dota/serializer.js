define(
	// Dependencies
	[
		'ember',
		'emberdata',
		'js/routes/application/application',
	],
	
function() {

	App.MatchSerializer = DS.RESTSerializer.extend({
		extractArray: function(store, type, payload, id, requestType) {
				// now our dota match history
				var newObj = {};
				newObj['matches'] = [];
				console.log(payload);
				if(payload.matches){
					
					// var matchIds = payload.mapProperty('match_id');
					// newObj['social']['matches'] = matchIds;

					payload.matches.forEach(function(match){

						var matchObj = {};
						matchObj['id'] = match.match_id;
						var heroIds = match.players.mapProperty('hero_id');
						matchObj['heroes'] = heroIds;

						match.players.forEach(function(player){
							if(player.account_id == 139716592){
								matchObj['hero'] = player.hero_id;
							}
						});
						newObj['matches'].pushObject(matchObj);
					});
				}
				// now our dota heroes
				if(payload.heroes){
					var heroIds = payload.heroes.mapProperty('id');
					newObj['dotaHeroes'] = payload.heroes;
				}
			return this._super(store, type, newObj, id, requestType);
		}
	});

});