define(
	// Dependencies
	[
		'ember',
		'js/routes/application/application'
	],
	
function() {
	// controller for main route
	App.InstagramController = Ember.ArrayController.extend({

		startAt: 0,
		lastStartAt: 0,
		currentSet: [],

		currentSetWatch: function(){
			var n = this.get('startAt');
			var lastStartAt = this.get('lastStartAt');
			if(lastStartAt <= n){
				var set = this.get('model').objectAt(n+2);
				this.get('currentSet').removeAt(0).pushObject(set);
			} else {
				var set = this.get('model').objectAt(n-1);
				this.get('currentSet').removeAt(2).insertAt(0, set);
			}
			// var set = this.get('model').objectsAt([n, n+1, n+2]);
			this.set('lastStartAt', n);
			// return set;
		}.observes('this.startAt'),

		actions: {
			nextInstagram: function(){
				if(this.get('model').objectAt(this.get('startAt')+3)){
					var n = this.get('startAt');
					var set = this.get('model').objectAt(n+2);
					this.get('currentSet').addObject(set);
					this.incrementProperty('startAt');
				}
			},
			prevInstagram: function(){
				if(this.get('model').objectAt(this.get('startAt')-1)){
					this.decrementProperty('startAt');
				}
			},
			navLink: function(route){
				App.set('startScrolling', true);
				App.set('scrollTo', route.link);
				this.transitionToRoute(route.link);
			},
			closeLightbox: function(){
				App.toggleProperty('lightbox');
			}
		}
	});

});