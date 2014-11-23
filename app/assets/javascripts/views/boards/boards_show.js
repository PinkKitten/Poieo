TrelloClone.Views.BoardsShow = Backbone.CompositeView.extend({
	
	initialize: function(options) {
		this.model = options.model;
		this.listenTo(this.model.lists(), "add", this.addList);
		this.listenTo(this.model, "sync", this.render);
		// var listNewView = new TrelloClone.Views.ListsNew({ model: this.model });
		// this.addSubview(".lists-new", listNewView.render());
		this.model.lists().each(this.addList.bind(this));
	},
	
	template: JST['boards/show'],
	
	addList: function (list) {
		list.fetch();
		var listsShow = new TrelloClone.Views.ListsShow({ model: list });
		this.addSubview(".lists", listsShow);
	},
	
	render: function() {
		// var view = this;
		var content = this.template({ 
			board: this.model 
		});
		this.$el.html(content);
		this.attachSubviews();
		return this;
	}
	
})