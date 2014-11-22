TrelloClone.Routers.Router = Backbone.Router.extend({
	initialize: function(options) {
		this.collection = options.collection;
		this.$rootEl = options.$rootEl;
	},
	
	routes: {
		"": "boardsIndex",
		"api/boards/:id": "boardsShow"
	},
	
	boardsIndex: function () {
		this.collection.fetch();
		var view = new TrelloClone.Views.BoardsIndex({ collection: this.collection });
		this.$rootEl.html(view.render().$el);
	},
	
	boardsShow: function (id) {
		model = new TrelloClone.Models.Board({id: id});
		model.fetch();
		// var model = this.collection.fetchOrGet(id);
		var view = new TrelloClone.Views.BoardsShow({ model: model });
		this.$rootEl.html(view.render().$el);
	}
});
