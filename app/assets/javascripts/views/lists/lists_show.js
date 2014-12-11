TrelloClone.Views.ListsShow = Backbone.CompositeView.extend({
	tagName: 'div',
	className: 'list',
	
	initialize: function(options) {
		this.model = options.model;
		this.addCard(this.model, this.model.cards());
	},
	
	events: {
		'dropList': 'dropList',
		'click div.new-card-form': 'addNewCard',
		'submit .new-card': 'createNewCard',
	},
	
  template: JST['lists/show'],
	
	createNewCard: function (event) {
		event.preventDefault();
		var attr =  $(event.currentTarget).serializeJSON();
		var newCard = new TrelloClone.Models.Card(attr['card']);
		newCard.set({ list_id: this.model.id });
		newCard.save({}, {
			success: function() {
				$('.new-card').addClass('in-active');
				$('.make-new-card').removeClass('in-active');
				this.model.cards().add(newCard);
			}.bind(this)
		})
	},
	
	addNewCard: function(event) {
		var $target = $(event.currentTarget);
		$target.find('.make-new-card').addClass('in-active');
		$target.find('.new-card').removeClass('in-active')
	},
	
	addCard: function (model, collection, options) {
		var cardsShow = new TrelloClone.Views.CardsIndex({ collection: collection, listId: this.model.id });
		this.addSubview(".cards", cardsShow);
	},
	
	dropList: function(event, index) {
		this.$el.trigger('update-sort-lists', [this.model, index]);
	},
	
	render: function() {
		var content = this.template({ list: this.model });
		this.$el.html(content);
		this.attachSubviews();
		// this.draggable();
		return this;
	},
	
	// draggable: function () {
	// 	this.$('.cards-container').sortable({
	// 		connectWith: '.cards-container',
	// 	  stop: function (event, ui) {
	//   		ui.item.trigger('dropList', [ui.item.index(), ui.item.parent().attr('id')]);
	//   	}
	// 	});
	// }
});
