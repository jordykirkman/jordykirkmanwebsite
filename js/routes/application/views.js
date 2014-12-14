define(
	// Dependencies
	[
		'ember',
		'svg',
		'js/routes/application/application',
	],
	
function() {

	App.staticNavView = Ember.View.extend({
		classNames: ['nav-container'],

		sticky: function(){
			return App.get('toTop') > App.get('headerHeight') ? true : false;
		}.property('App.toTop', 'App.headerHeight', 'this.didInsertElement'),

		links: function(){
			return App.get('links');
		}.property('App.links'),

		actions: {
			goTo: function(link){
				var target = link.link;

				var toTopRoute = $('.wrapper .container #' + target).offset().top;
				var routeReight = $('.wrapper .container #' + target).height();
				var scroll = toTopRoute - 100;

				$('html, body').animate({
				'scrollTop': scroll
				}, 500, 'swing');

			}
		},
		
		template: Ember.Handlebars.compile('<ul {{bind-attr class=":animated :nav view.sticky:squished"}}>{{#each view.links}}<li><a {{action "goTo" this target="view"}}>{{name}}</a></li>{{/each}}</ul>')
		
	});

	// sticky navigation view
	App.navView = Ember.View.extend({
		classNameBindings: ['sticky:sticky'],
		classNames: ['navbar', 'animated'],

		sticky: function(){
			return App.get('toTop') > App.get('headerHeight') ? true : false;
		}.property('App.toTop', 'App.headerHeight', 'this.didInsertElement'),



		links: function(){
			return App.get('links');
		}.property('App.links'),

		actions: {
			goTo: function(link){
				var target = link.link;

				var toTopRoute = $('.wrapper .container #' + target).offset().top;
				var routeReight = $('.wrapper .container #' + target).height();
				var scroll = toTopRoute - 100;

				$('html, body').animate({
				'scrollTop': scroll
				}, 500, 'swing');

			}
		},
		
		template: Ember.Handlebars.compile('<ul class="nav">{{#each view.links}}<li><a {{action "goTo" this target="view"}}>{{name}}</a></li>{{/each}}</ul>')
		
	});

});