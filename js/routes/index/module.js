define(
	// Dependencies
	[
		'text!./template.html',
		'ember',
		'js/routes/application/application'
	],
	
	function(template) {

	var moduletemplate = Ember.Handlebars.compile(template);

	App.register( 'template:index', moduletemplate );

});