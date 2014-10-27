define(
	// Dependencies
	[
		'text!./template.html',
		'./route',
		'./controller',
		'./model',
		'./serializer',
		'./views',
		'ember',
		'js/routes/application/application'
	],
	
	function(template) {

	var moduletemplate = Ember.Handlebars.compile(template);

	App.register( 'template:art', moduletemplate );

});