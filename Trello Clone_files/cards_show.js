TrelloClone.Views.CardsShow = Backbone.View.extend({
	
	tagName: 'div',
	className: 'card',
  template: JST['cards/show'],
	
	events: {
		'drop': 'drop'
	},
	
	drop: function(event, index, droppedListId) {
		this.$el.trigger('update-sort', [this.model, index, droppedListId]);
	},
	
	render: function() {
		var content = this.template({ card: this.model });
		this.$el.html(content);
		return this;
	}

});
