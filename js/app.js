App = Ember.Application.create({
	customEvents: {
    	// add support for the paste event
    	scroll: "scroll"
	},
	links: [],
});

App.ApplicationAdapter = DS.RESTAdapter.extend({
	// outputs a different api endpoint depending on environment. get rid of this when we go live
	host: 'apihandler.php?',

	defaultSerializer: "DS/customRest",
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

App.SocialSerializer = DS.RESTSerializer.extend({
	extractSingle: function(store, type, payload, id, requestType) {
		console.log(payload);
		var newObj = {};
		newObj['social'] = {};
		newObj['social']['id'] = 1;

		// lets reformat our instagram stuff so ember data can work with it
		if(payload.social.instagrams){
			var instagramIds = payload.social.instagrams.mapProperty('id');
			newObj['social']['instagrams'] = instagramIds;
			newObj['instagrams'] = [];
			payload.social.instagrams.forEach(function(model){
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

		// lets lets reformat our d3 history
		if(payload.social.diablo.heroes){
			var diabloObj = {};
			diabloObj['id'] = 1;
			var diabloHeroIds = payload.social.diablo.heroes.mapProperty('id');
			diabloObj['diabloHeroes'] = diabloHeroIds;
			diabloObj['lastHeroPlayed'] = payload.social.diablo.lastHeroPlayed;
			diabloObj['monsterKills'] = payload.social.diablo.kills.monsters;
			diabloObj['eliteKills'] = payload.social.diablo.kills.elites;
			newObj['diablos'] = [];
			newObj['diablos'].pushObject(diabloObj);
			newObj['social']['diablo'] = 1;
			newObj['diabloHeroes'] = payload.social.diablo.heroes;
		}

		// now our starcraft career
		if(payload.social.starcraft){
			var scObj = {};
			scObj['id'] = payload.social.starcraft.id;
			// scObj['portrait'] = payload.social.starcraft.portrait.url;
			newObj['social']['starcraft'] = payload.social.starcraft.id;
			newObj['starcrafts'] = [];
			newObj['starcrafts'].pushObject(scObj);
		}

		// now our dota heroes
		if(payload.social.heroes){
			var heroIds = payload.social.heroes.mapProperty('id');
			newObj['social']['dotaHeroes'] = heroIds;
			newObj['dotaHeroes'] = payload.social.heroes;
		}

		// now our dota match history
		if(payload.social.matches){
			var matchIds = payload.social.matches.mapProperty('match_id');
			newObj['social']['matches'] = matchIds;

			newObj['matches'] = [];
			payload.social.matches.forEach(function(match){

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

		// console.log(newObj);
		return this._super(store, type, newObj, id, requestType);
	},
});

// controller for main route
App.ApplicationController = Ember.Controller.extend({
	actions: {
		more: function(){
			var route = App.get('nextRoute');
			this.transitionToRoute(route);
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

App.SocialController = Ember.Controller.extend({
});

App.staticNavView = Ember.View.extend({
	classNames: ['nav-container'],

	sticky: function(){
		return App.get('sticky') === true ? true : false;
	}.property('App.sticky'),

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
		return App.get('sticky') === true ? true : false;
	}.property('App.sticky'),

	didInsertElement: function(){
		var view = this;
		// $(window).on( "scroll", Ember.run.bind(this, view.didScroll()) );
		// var that = this;
		$(window).on('scroll', function(){
			Ember.run.debounce(this, didScroll, 200);
		});

		function didScroll(){

			var height = $(document).height();
			var footerHeight = $('.footer').outerHeight(true);

			// from the top of the window to the top of the page
			var toTop = $(window).scrollTop();
			var windowHeight = $(window).height();

			var triggerPos = (height - footerHeight) - windowHeight;

			var biggear = SVG.get('SvgjsPath1006');
			var lilgear = SVG.get('SvgjsPath1007');

			var spin = toTop / 2;

			biggear.animate().rotate(spin / 2);
			lilgear.animate().rotate(spin * -0.75);

			if( toTop >= triggerPos ){
				if(App.get('nextRoute')){
					view.get('controller').send('more');
				}
			}

			var headerHeight = $('.header').height() + 40;
			if(toTop > headerHeight){
				view.set('sticky', true);
				App.set('sticky', true);
			} else {
				view.set('sticky', false);
				App.set('sticky', false);
			}

		}

		// var content = this.get('content');
		var draw = SVG('canvas').size('300px', '800px');
		// var image = draw.circle(100, 118).fill('#ff8200');
		var gear = draw.path('M418.638,272.645c1.868,6.642,8.61,20.016,5.783,26.806c-3.18,7.653-21.39,14.276-28.393,18.271c-9.97,5.69-17.557,13.693-27.066,4.118c-6.721-6.761-15.642-21.054-25.696-22.356c-18.026-2.328-24.461,11.935-26.206,26.98c-0.779,6.677-1.561,17.573-9.397,19.918c-9.173,2.74-22.061-0.125-31.565-0.228c-5.542-0.062-20.135,3.345-23.18-3.078c-4.811-10.149-5.837-23.27-9.238-34.055c-2.545-8.119-16.175-11.119-23.279-9.067c-10.492,3.03-15.098,14.097-22.069,21.423c-13.728,14.453-31.715-5.325-44.71-12.886c-6.225-3.622-15.818-5.785-12.979-14.737c2.715-8.521,12.389-29.113,7.73-37.411c-11.602-20.684-26.869-10.792-44.253-5.741c-9.319,2.71-15.186,0.369-19.627-8.254c-5.05-9.812-10.854-18.469-16.51-27.897c-10.296-17.178,11.583-27.731,22.339-38.052c7.033-6.746,0.133-18.461-2.084-26.163c-1.331-4.726-31.81-8.675-36.867-9.885c-8.94-2.138-5.825-6.1-5.825-14.354c0-6.481,0-12.96,0-19.438c0-6.48,0-12.958,0-19.441c0-9.088,2.178-7.053,10.01-9.357c16.061-4.719,39.922-4.608,36.525-28.3c-1.317-9.188-12.12-16.475-18.292-22.619C63.29,16.394,63.695,14.428,70.981,1.615c6.169-10.84,12.483-21.596,18.945-32.263c4.201-6.908,28.925,3.691,34.874,5.257c19.527,5.139,26.315-14.555,20.803-30.708c-2.401-7.042-7.986-16.772-4.891-24.385C144.3-89.32,157.706-92.17,165.15-96.51c6.783-3.957,15.152-13.333,23.791-12.159c8.72,1.184,14.805,11.899,19.702,18.109c5.616,7.12,13.05,11.424,22.263,9.156c12.718-3.128,13.12-10.688,16.229-22.235c1.621-6.012,3.334-12,5.018-17.996c2.533-9.036,6.113-6.003,14.628-6.003c12.962,0,25.92,0,38.882,0c9.515,0,7.362,3.456,9.442,11.772c1.47,5.889,2.952,11.774,4.562,17.625c3.048,11.072,8.38,18.411,21.532,18.073c15.235-0.393,24.571-33.83,39.612-27.688c10.543,4.305,20.695,12.254,30.617,17.934c15.423,8.828,13.77,12.756,9.214,29.069c-4.105,14.716-5.297,40.069,18.115,36.456c20.888-3.226,33.35-18.168,44.954,6.898c4.729,10.22,11.168,19.532,16.274,29.57c3.74,7.356-12.179,18.242-16.4,22.554c-12.485,12.761-15.098,33.348,6.246,38.341c8.352,1.956,18.208,1.246,25.678,6.065c7.572,4.886,4.925,16.127,4.455,23.562c-0.594,9.347,3.275,24.328-1.245,32.761c-4.378,8.168-21.913,8.94-30,11.332c-19.689,5.825-19.971,27.539-4.654,38.732c5.783,4.228,15.497,9.72,16.66,17.605c1.264,8.594-9.623,19.421-13.543,26.428c-3.329,5.952-7.742,18.468-14.372,21.315c-7.537,3.231-22.961-4.529-30.603-6.399C425.701,240.33,409.323,256.619,418.638,272.645C421.167,281.648,414.669,265.812,418.638,272.645z')
		.fill('#eaeaea');
		var lilgear = draw.path('M109.801-48.464c21.553,0,22.198,3.605,24.073,17.062c1.426,10.217,4.936,17.815,16.955,24.038C171.61,3.4,189.781-8.513,206.377-21.744c2.302-1.551,5.603-1.467,7.973-0.027c2.841,1.508,14.009,12.095,16.77,13.896c7.788,5.095,6.941,11.233,2.413,19.036c-11.356,15.408-16.555,34.397-10.664,50.683c5.892,16.285,13.861,21.504,26.43,23.935c18.086,3.491,17.943,4.246,17.943,22.748c0,19.708,0,19.708-19.105,24.474c-9.101,2.277-15.509,4.849-21.116,15.388c-11.178,21.012-8.852,37.64,5.434,54.737c0.896,1.078,0.514,4.562-0.559,5.73c-6.854,7.413-13.922,14.657-21.308,21.54c-1.396,1.308-5.106,1.734-6.812,0.825c-9.06-4.86-18.27-15.143-26.593-14.389c-13.421,1.22-28.903,6.773-38.364,15.849c-7.137,6.849-6.563,22.714-8.226,30.312c-0.504,2.3-2.624,3.271-4.655,3.271c-5.379,0-10.758,0-16.137,0c-5.379,0-10.758,0-16.137,0c-2.031,0-4.151-0.972-4.655-3.271c-1.661-7.598-1.09-23.463-8.226-30.312c-9.461-9.075-24.943-14.629-38.365-15.849c-8.323-0.754-17.533,9.528-26.593,14.389c-1.705,0.909-5.414,0.482-6.812-0.825c-7.386-6.883-14.454-14.127-21.308-21.54c-1.072-1.169-1.454-4.652-0.558-5.73C1.433,186.028,3.759,169.4-7.419,148.388c-5.607-10.539-12.016-13.11-21.116-15.388c-19.106-4.766-19.106-4.766-19.106-24.474c0-18.502-0.142-19.257,17.944-22.748c12.568-2.431,20.538-7.649,26.429-23.935C2.623,45.559-2.574,26.57-13.93,11.162c-4.53-7.803-5.377-13.941,2.412-19.036c2.761-1.802,13.93-12.389,16.771-13.896c2.369-1.439,5.67-1.523,7.972,0.027C29.821-8.513,47.991,3.4,68.773-7.365c12.02-6.223,15.53-13.821,16.957-24.038C87.603-44.859,88.248-48.464,109.801-48.464z')
		.move(65,330).fill('#eaeaea');

	},

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

App.Social = DS.Model.extend({
	dotaHeroes: DS.hasMany('dotaHero'),
	diabloHeroes: DS.hasMany('diabloHero'),
	matches: DS.hasMany('match'),
	instagrams: DS.hasMany('instagram'),
	starcraft: DS.belongsTo('starcraft'),
	diablo: DS.belongsTo('diablo'),
});
App.Instagram = DS.Model.extend({
	lowResolution: DS.attr('string'),
	standardResolution: DS.attr('string'),
	thumbnail: DS.attr('string'),
	caption: DS.attr('string'),
	likes: DS.attr('number'),
});
App.Diablo = DS.Model.extend({
	lastHeroPlayed: DS.belongsTo('diabloHero'),
	diabloHeroes: DS.hasMany('diabloHero'),
	monsterKills: DS.attr('number'),
	eliteKills: DS.attr('number'),
});
App.DiabloHero = DS.Model.extend({
	class: DS.attr('string'),
	level: DS.attr('string'),
});
App.DotaHero = DS.Model.extend({
	localized_name: DS.attr('string'),
});
App.Match = DS.Model.extend({
	hero: DS.belongsTo('dotaHero'),
	heroes: DS.hasMany('dotaHero')
});

App.Starcraft = DS.Model.extend({
	portrait: DS.attr('string'),
});

App.Router.map(function() {
  this.resource('index', { path: "/" }, function(){
  	this.resource('social', { path: "/social" }, function(){

	  	this.resource('art', { path: "/art" }, function(){

		  	this.resource('dev', { path: "/dev" }, function(){

			  	this.resource('stuff1', { path: "/stuff1" }, function(){
				  	this.resource('stuff2', { path: "/stuff2" }, function(){
				  	});
			  	});
		  	});
	  	});
  	});
  });
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

App.IndexRoute = Ember.Route.extend({
	activate: function(){
		this.transitionTo('social');
	},

});

App.SocialRoute = App.ScrollerRoute.extend({
	prev: null,
	next: 'art',
	past: 'social',
	link: {'name': 'Social', 'link': 'social'},

	model: function(params) {
		// var url = 'apihandler.php';
		var model = this.store.find('social', 1);

		return model;
	},
	setupController: function(controller, model){
		controller.set('model', model);
	},

});

App.ArtRoute = App.ScrollerRoute.extend({
	prev: 'social',
	next: 'dev',
	past: 'art',
	link: {'name': 'Art', 'link': 'art'},
});

App.DevRoute = App.ScrollerRoute.extend({
	prev: 'art',
	next: null,
	past: 'dev',
	link: {'name': 'Dev', 'link': 'dev'},
});

// App.Stuff1Route = Ember.Route.extend({
//   activate: function(){
//   	App.set('nextRoute', 'stuff2');
//   },
// 	deactivate: function(){
// 	// when a route is torn down
// 		App.set('nextRoute', 'stuff1');
// 	}
// });

// App.Stuff2Route = Ember.Route.extend({
//   activate: function(){
//   	App.set('nextRoute', null);
//   },
// 	deactivate: function(){
// 	// when a route is torn down
// 		App.set('nextRoute', 'stuff2');
// 	}
// });

App.LoadingRoute = Ember.Route.extend();

var LoadTemplate = Ember.Handlebars.compile('<div class="loading"><img src="./images/hydra_loading.gif"/></div>');
App.register( 'template:loading', LoadTemplate );

App.dotaHeroView = Ember.View.extend({
	attributeBindings: ['style'],
	classNames: ['dota-hero-image-thumb'],
	classNameBindings: ['name'],
	name: function(){
		return this.get('context.hero').get('localized_name');
	}.property(),
	style: function(){
		var context = this.get('context.hero');
		var id = context.get('id') - 1;
		var top = ((id - (Math.floor(id/10) * 10)) * 72);
		var left = Math.floor(id / 10) * 128;
		return 'background-position: -' + left + 'px -' + top + 'px;';
	}.property(),
	template: Ember.Handlebars.compile('{{view.name}}')
});

App.dotaHeroesView = Ember.View.extend({
	attributeBindings: ['style'],
	classNames: ['dota-hero-image-thumb'],
	classNameBindings: ['name'],
	name: function(){
		return this.get('context').get('localized_name');
	}.property(),
	style: function(){
		var context = this.get('context');
		var id = context.get('id') - 1;
		var top = ((id - (Math.floor(id/10) * 10)) * 72);
		var left = Math.floor(id / 10) * 128;
		return 'background-position: -' + left + 'px -' + top + 'px;';
	}.property(),
	template: Ember.Handlebars.compile('{{view.name}}')
});

App.imageViewer = Ember.View.extend({
	tagName: 'img',
	classNames: ['thumbnail'],
	attributeBindings: ['src', 'alt'],
	src: function(){
		return './images/' + this.get('path') + '/' + this.get('thumb');
	}.property(),
	click: function(event) {
		// console.log(this.get('lightbox'));
		// this.toggleProperty('lightbox');
		var path = './images/' + this.get('path') + '/' + this.get('full');
		App.set('lightboxImage', path);
		App.toggleProperty('lightbox');
	},
	// template: Ember.Handlebars.compile('{{#link-to "art.lightbox" view.model}}<img class="lightbox-img" {{bind-attr src="view.src"}}/>{{/link-to}}')
});

