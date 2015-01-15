TrelloClone.Views.CardsShow = Backbone.View.extend({
	
	tagName: 'div',
	className: 'card',
  template: JST['cards/show'],
    
    initialize: function(options) {
        this.collection = options.collection;
    },
	
	events: {
		'drop': 'drop',
        'click .save-card': "updateCard"
	},
	
	drop: function(event, index, droppedListId) {
		this.$el.trigger('update-sort', [this.model, index, droppedListId]);
	},
	
	render: function() {
		var content = this.template({ card: this.model });
		this.$el.html(content);
		return this;
	},
    
    updateCard: function(event) {
        event.preventDefault();
        $target = $(event.currentTarget).parent().parent().find(".edit-card");
        var attributes = $target.serializeJSON();
        this.model.set(attributes['card']);
        this.model.save({}, {
          success: function () {
            this.collection.set(this.model, { remove: false });
          }.bind(this)
        })
    }

});
