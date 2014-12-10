TrelloClone.Views.CardsIndex = Backbone.CompositeView.extend({
	tagName: "div",
	className: "",
	template: JST['cards/index'],
	
	initialize: function(options) {
		this.collection = options.collection;
		this.parentListId = options.listId;
		// this.listenTo(this.collection, 'sync', this.render);
		this.listenTo(this.collection, 'add', this.addCard);
		this.collection.each(this.addCard.bind(this));
	},
	
	events: {
		'update-sort': 'updateSort',
		'click div.make-new-card': 'addNewCard'
	},
	
	addNewCard: function(event) {
		debugger
		var $target = $(event.currentTarget);
		// var listId = $target.attr('data-id');
		// var card = new TrelloClone.Models.Card();
		// $target.addClass('in-active');
		// $('.new-card').removeClass('in-active');
	},
	
	updateSort: function(event, movedModel, position, droppedListId) {
		debugger
		//loop through the area based on the ord and length of the collection
		movedModel.set('list_id', droppedListId);
		movedModel.save();
		var originalIdx = 0;
		this.collection.forEach(function(model, index) {
			if (model === movedModel) { 
				originalIdx = index;
			}
		})
		this.collection.forEach(function(model, index) {
			if (model === movedModel) {
				model.set('ord', position);
				model.save();
			} else {
				var ordinal = index;
				if (index > originalIdx) {
					ordinal -= 1;
				}
				if (ordinal >= position ) {
					ordinal += 1;
				}
				model.set('ord', ordinal);
				model.save();
			}
		});
	},
	
	addCard: function (card) {
		var cardsShow = new TrelloClone.Views.CardsShow({ model: card });
		this.addSubview(".cards-container", cardsShow);
	},
	
	render: function() {
		var content = this.template({ 
			parentListId: this.parentListId 
		});
		this.$el.html(content);
		this.attachSubviews();
		return this;
	},
	
})