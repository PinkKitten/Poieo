TrelloClone.Views.CardsShow = Backbone.View.extend({
    
    template: JST['cards/show'],
    tagName: 'div',
    className: 'card',
    attributes: function() {
        return {
            'data-id': this.model.id
        };
    },
    
    initialize: function(options) {
        this.collection = options.collection;
    },
    
    events: {
        'dropCard': 'dropCard',
        'click .save-card': "updateCard",
        'click .close-form': 'closeCardModal',
        'click .edit': 'openCardModal'
    },
    
    closeCardModal: function(event) {
        $('#card_title').val(this.model.get('title'));
        $('#card_description').val(this.model.get('description'));
    },
    
    dropCard: function(event, index, droppedListId) {
        this.$el.trigger('update-sort', [this.model, index, droppedListId]);
    },
    
    openCardModal: function(event) {
        var card = "card" + this.model.id;
        $('body').on('shown.bs.modal', '.modal', function() {
            $("#card_description").focus();
        })
    },
    
    render: function() {
        var content = this.template({
            card: this.model
        });
        this.$el.html(content);
        return this;
    },
    
    updateCard: function(event) {
        event.preventDefault();
        $target = $(event.currentTarget).parent().parent().find(".edit-card");
        var attributes = $target.serializeJSON();
        this.model.set(attributes['card']);
        this.model.save({}, {
            success: function() {
                this.collection.set(this.model, {remove: false});
            }.bind(this)
        })
    }
});