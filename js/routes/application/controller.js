define(
	// Dependencies
	[
		'ember',
		'js/routes/application/application'
	],
	
function() {

	// controller for main route
	App.ApplicationController = Ember.Controller.extend({

		more: function(){
			var toTop = App.get('toTop');
			var triggerPos = App.get('triggerPos');
			var route = App.get('nextRoute');

			if( toTop >= triggerPos ){
				if(App.get('nextRoute')){
					if(route){
						this.transitionToRoute(route);
					}
				}
			}
		}.observes('App.toTop', 'App.triggerPos'),

		actions: {
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