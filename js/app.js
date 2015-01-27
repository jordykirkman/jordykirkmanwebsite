requirejs.config({

	// this will append the timestamp to all scripts and remove caching
	urlArgs: '1.1',

    //By default load any module IDs from /lib
    baseUrl: '/',
    paths: {
    	//shorthand paths to scripts
        app: 				'js/app',
		jquery: 			'js/libs/jquery-1.10.2',
		handlebars: 		'js/libs/handlebars-v1.3.0',
		ember: 				'js/libs/ember-1.7.0',
		emberdata: 			'js/libs/ember-data',
		text: 				'js/libs/text',
		// svg: 				'js/libs/svg.min',
    },
	shim: {
		//scripts that cant be wrapped in a define function that have dependancies
		'ember': {
			deps: ['jquery', 'handlebars']
		},
		'handlebars': {
			deps: ['jquery']
		},
		'emberdata': {
			deps: ['ember']
		}
	}
});


define(
	// Dependencies
	[
		'require',
		'ember',
		'js/routes/application/module',
		'js/routes/index/module',
		'js/routes/instagram/module',
		'js/routes/gaming/module',
		'js/routes/dota/module',
		'js/routes/art/module',
		'js/routes/dev/module',
	],

	function(Require) {

	// create a loading route!
	App.LoadingRoute = Ember.Route.extend();

	var LoadTemplate = Ember.Handlebars.compile('<div class="loading"><h3>Loading data...</h3><img src="../images/loading.gif"/></div>');
	App.register( 'template:loading', LoadTemplate );

	App.Router.map(function() {

		this.resource('index', { path: "/" }, function(){

			this.resource('instagram', { path: "/instagram" }, function(){

				this.resource('gaming', { path: "/gaming" }, function(){

					this.resource('dota', { path: "/dota" }, function(){

						this.resource('art', { path: "/art" }, function(){

							this.resource('dev', { path: "/dev" }, function(){

								// this.resource('stuff1', { path: "/stuff1" }, function(){
								// });

							});

						});

					});
				});

			});

		});

	});

	App.LoadingRoute = Ember.Route.extend();

	var LoadTemplate = Ember.Handlebars.compile('<div class="loading"><img src="./images/hydra_loading.gif"/></div>');
	App.register( 'template:loading', LoadTemplate );




});