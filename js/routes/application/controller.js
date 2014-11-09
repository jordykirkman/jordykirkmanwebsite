define(
	// Dependencies
	[
		'ember',
		'js/routes/application/application'
	],
	
function() {

	// controller for main route
	App.ApplicationController = Ember.Controller.extend({
		actions: {
			more: function(){
				var route = App.get('nextRoute');
				if(route){
					this.transitionToRoute(route);
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