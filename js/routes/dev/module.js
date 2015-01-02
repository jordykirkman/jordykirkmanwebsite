define(
	// Dependencies
	[
		'text!./template.html',
		'./route',
		'./views',
		'ember',
		'js/routes/application/application'
	],
	
	function(template) {

	var moduletemplate = Ember.Handlebars.compile(template);

	App.register( 'template:dev', moduletemplate );

});