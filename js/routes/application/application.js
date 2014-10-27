define(
	// Dependencies
	[
		'ember',
		'emberdata',
	],
	
function() {

	App = Ember.Application.create({
		customEvents: {
	    	// add support for the paste event
	    	scroll: "scroll"
		},
		links: [],
	});

	App.ApplicationAdapter = DS.RESTAdapter.extend({
		// outputs a different api endpoint depending on environment. get rid of this when we go live
		host: 'api',

		defaultSerializer: "DS/customRest",

		buildURL: function(type, id) {
			if(type == "instagram" && App.get('lastID')){
				return this._super(type) + '.php?minid=' + App.get('lastID');
			} else {
				return this._super(type) + '.php';
			}
		},
	});

	App.InstagramSerializer = DS.RESTSerializer.extend({
		extractSingle: function(store, type, payload, id, requestType) {
			console.log(payload);
			var newObj = {};
			newObj['instagrams'] = [];
			// lets reformat our instagram stuff so ember data can work with it
			if(payload.instagrams){
				// var instagramIds = payload.instagrams.mapProperty('id');
				// newObj['instagrams'] = instagramIds;
				// newObj['instagrams'] = [];
				payload.instagrams.forEach(function(model){
					var modelObj = {};
					modelObj['id'] = model.id;
					$.each( model.images, function( modelkey, modelvalue ) {
						modelObj[modelkey.camelize()] = modelvalue.url;
					});
					modelObj['likes'] = model.likes.count;
					modelObj['caption'] = model.caption.text;
					newObj['instagrams'].pushObject(modelObj);
				});
			}
			return this._super(store, type, newObj, id, requestType);
		}
	});

	App.ScrollerRoute = Ember.Route.extend({
		activate: function(){
			
			var next = this.get('next');
			var link = this.get('link');
			
			App.set('nextRoute', next);
			App.get('links').pushObject(link);

		},
		deactivate: function(){
			// when a route is torn down
			var past = this.get('past');
			App.set('nextRoute', past);
		},

	});

	DS.CustomRestSerializer = DS.RESTSerializer.extend({
		extractSingle: function(store, type, payload, id, requestType) {
			return this._super(store, type, payload, id, requestType);
		},

		extractArray: function(store, type, payload, id, requestType) {
			return this._super(store, type, payload, id, requestType);
		},

	  normalize: function(type, hash, property) {
	    // property will be "post" for the post and "comments" for the
	    // comments (the name in the payload)

	    if(hash.account_id){
	    	hash['id'] = hash.account_id;
	    	delete hash.account_id;
	    }
	    // if(hash.match_id){
	    // 	hash['id'] = hash.match_id;
	    // 	delete hash.match_id;
	    // }
	    // delegate to any type-specific normalizations
	    return this._super(type, hash, property);
	  }
	});

});