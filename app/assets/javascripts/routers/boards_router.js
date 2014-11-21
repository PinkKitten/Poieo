TrelloClone.Routers.Router = Backbone.Router.extend({
	initialize: function(options) {
		this.collection = options.collection;
		this.$rootEl = options.$rootEl;
	},
	
	routes: {
		"": "boardsIndex"
	},
	
	boardsIndex: function () {
		this.collection.fetch();
		var view = new TrelloClone.Views.BoardsIndex({ collection: this.collection });
		this.$rootEl.html(view.render().$el);
	}
});
