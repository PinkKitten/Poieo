TrelloClone.Views.ListsShow = Backbone.CompositeView.extend({
	tagName: 'div',
	className: 'list',
	
	initialize: function(options) {
		this.model = options.model;
		this.listenTo(this.model.cards(), "add", this.addCard);
		// this.listenTo(this.model, "sync", this.render);
		this.addCard(this.model, this.model.cards());
		// var listNewView = new TrelloClone.Views.ListsNew({ model: this.model });
		// this.addSubview(".lists-new", listNewView.render());
	},
	
	events: {
		'drop': 'drop'
	},
	
  template: JST['lists/show'],
	
	addCard: function (model, collection, options) {
		var cardsShow = new TrelloClone.Views.CardsIndex({ collection: collection, listId: this.model.id });
		this.addSubview(".cards", cardsShow);
	},
	
	drop: function(event, index) {
		this.$el.trigger('update-sort-lists', [this.model, index]);
	},
	
	render: function() {
		var content = this.template({ list: this.model });
		this.$el.html(content);
		this.attachSubviews();
		// this.draggable();
		return this;
	},
	
	draggable: function () {
		this.$('.cards-container').sortable({
			connectWith: '.cards-container',
		  stop: function (event, ui) {
	  		ui.item.trigger('drop', [ui.item.index(), ui.item.parent().attr('id')]);
	  	}
		});
	}
});
