TrelloClone.Views.BoardsShow = Backbone.View.extend({
	
	initialize: function(options) {
		this.listenTo(this.model, 'sync', this.render);
	},
	
	template: JST['boards/show'],
	
	render: function() {
		debugger
		var content = this.template({ board: this.model });
		this.$el.html(content);
		return this;
	}
	
})