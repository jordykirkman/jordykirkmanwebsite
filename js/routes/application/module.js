define(
	// Dependencies
	[
		'text!./template.html',
		'./application',
		'./views',
		'./controller',
		'./route',
		'ember',
	],
	
	function(template) {

	var moduletemplate = Ember.Handlebars.compile(template);

	App.register( 'template:application', moduletemplate );

});