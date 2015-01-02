define(
	// Dependencies
	[
		'ember',
		'emberdata',
		'js/routes/application/application',
	],
	
function() {

	App.InstagramSerializer = DS.RESTSerializer.extend({
		extractArray: function(store, type, payload, id, requestType) {
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

});