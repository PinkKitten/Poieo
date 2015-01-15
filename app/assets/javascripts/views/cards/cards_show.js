TrelloClone.Views.CardsShow = Backbone.View.extend({
	
	tagName: 'div',
	className: 'card',
  template: JST['cards/show'],
    
    initialize: function(options) {
        this.collection = options.collection;
    },
	
	events: {
		'drop': 'drop',
        'click .save-card': "updateCard",
        'click .close-form': 'closeCardModal',
        'click .edit': 'openCardModal'
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
    },
    
    closeCardModal: function(event) {
        $('#card_title').val(this.model.get('title'));
        $('#card_description').val(this.model.get('description'));
    },
    
    openCardModal: function(event) {
        var card = "card" + this.model.id;
        $('body').on('shown.bs.modal', '.modal', function () {
            $("#card_description").focus();
        })
    }
    
        //     deleteCard: function (event) {
        //         event.preventDefault();
        //         var $target = $(event.currentTarget);
        // var cardId = $target.attr('card-id')
        // var card = this.collection.get(cardId);
        //         debugger
        // card.destroy({
        //     success: function () {
        //         this.collection.remove(card);
        //                 debugger
        //         var that = this;
        //         _(this.subviews('.cards-container')).each(function(view){
        //             if(view.model && view.model.attributes.id === parseInt(cardId) ) {
        //                 that.removeSubview('.cards-container', view);
        //             }
        //         })
        //     }.bind(this)
        // });
        //     }

});
