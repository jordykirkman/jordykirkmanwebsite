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
		prevPanel: function(){
			if(this.get('controller.currentSet.firstObject') == this.get('context')){
				return true;
			} else {
				return false;
			}
		}.property('this.controller.currentSet.@each.didLoad', 'this.controller.currentSet.@each'),
		nextPanel: function(){
			if(this.get('controller.currentSet.lastObject') == this.get('context')){
				return true;
			} else {
				return false;
			}
		}.property('this.controller.currentSet.@each.didLoad', 'this.controller.currentSet.@each'),
		sidePanel: function(){
			if(this.get('controller.currentSet.lastObject') == this.get('context') || this.get('controller.currentSet.firstObject') == this.get('context')){
				return true;
			} else {
				return false;
			}
		}.property('this.controller.model.@each.didLoad', 'this.controller.currentSet.@each'),
		template: Ember.Handlebars.compile('\
	    	<img class="instagram-image" {{bind-attr src="standardResolution"}}/>\
	    	<a {{action "prevInstagram" target="controller"}} {{bind-attr class=":next-image view.prevPanel::hide"}}>\
	    	<i class="icon-arrow-left"></i>\
	    	</a>\
	    	<a {{action "nextInstagram" target="controller"}} {{bind-attr class=":next-image view.nextPanel::hide"}}>\
	    	<i class="icon-arrow-right"></i>\
	    	</a>\
	        <div {{bind-attr class=":padd view.sidePanel:hide"}}>\
	            {{#if likes}}<p>{{likes}} people like this</p>{{/if}}\
	            <p>\
	              {{caption}}\
	            </p>\
	        </div>')

	});


});