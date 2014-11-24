TrelloClone.Views.CardsShow = Backbone.View.extend({
	
	tagName: 'div',
	className: 'card',
  template: JST['cards/show'],
	

	
	render: function() {
		var content = this.template({ card: this.model });
		this.$el.html(content);
		return this;
	}

});
