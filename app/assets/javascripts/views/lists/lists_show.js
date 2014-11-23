TrelloClone.Views.ListsShow = Backbone.CompositeView.extend({

	initialize: function(options) {
		this.model = options.model;
		this.listenTo(this.model.cards(), "add", this.addCard);
		// this.listenTo(this.model, "sync", this.render);
		// var listNewView = new TrelloClone.Views.ListsNew({ model: this.model });
		// this.addSubview(".lists-new", listNewView.render());
		this.model.cards().each(this.addCard.bind(this));
	},
	
  template: JST['lists/show'],
	
	addCard: function (card) {
		// this.model.fetch();
		var cardsShow = new TrelloClone.Views.CardsShow({ model: card });
		this.addSubview(".cards", cardsShow);
	},
	
	render: function() {
		var content = this.template({ list: this.model });
		this.$el.html(content);
		return this;
	}

});
