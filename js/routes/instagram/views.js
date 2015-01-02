define(
	// Dependencies
	[
		'ember',
		'js/routes/application/application'
	],
	
function() {

	App.InstagramImage = Ember.View.extend({
		
		classNames: ['showcase-image'],
		classNameBindings: ['sidePanel'],
		attributeBindings: ['style'],
		style: function(){
			var bg = this.get('context.standardResolution');
			if(bg){
				return "background-image:url('" + bg + "')";
			}
		}.property('this.context.didLoad'),
		prevPanel: function(){
			if(this.get('controller.currentSet.firstObject') == this.get('context')){
				return true;
			} else {
				return false;
			}
		}.property('this.controller.currentSet.@each.didLoad'),
		nextPanel: function(){
			if(this.get('controller.currentSet.lastObject') == this.get('context')){
				return true;
			} else {
				return false;
			}
		}.property('this.controller.currentSet.@each.didLoad'),
		sidePanel: function(){
			if(this.get('controller.currentSet.lastObject') == this.get('context') || this.get('controller.currentSet.firstObject') == this.get('context')){
				return true;
			} else {
				return false;
			}
		}.property('this.controller.currentSet.@each.didLoad'),
		template: Ember.Handlebars.compile('\
			{{#if standardResolution}}\
	    	<a {{action "prevInstagram"}} {{bind-attr class=":next-image view.prevPanel::hide"}}>\
	    	<i class="icon-arrow-left"></i>\
	    	</a>\
	    	<a {{action "nextInstagram"}} {{bind-attr class=":next-image view.nextPanel::hide"}}>\
	    	<i class="icon-arrow-right"></i>\
	    	</a>\
	    	{{/if}}\
	        <div {{bind-attr class=":padd"}}>\
	            {{#if likes}}<p>{{likes}} people like this</p>{{/if}}\
	            <p>\
	              {{caption}}\
	            </p>\
	        </div>')

	});


});