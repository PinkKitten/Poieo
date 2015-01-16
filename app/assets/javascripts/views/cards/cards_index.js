TrelloClone.Views.CardsIndex = Backbone.CompositeView.extend({
    
    template: JST['cards/index'],
    tagName: "div",
    
    initialize: function(options) {
        this.collection = options.collection;
        this.parentListId = options.listId;
        this.listenTo(this.collection, 'add', this.addCard);
        this.collection.each(this.addCard.bind(this));
    },
    
    events: {
        'update-sort': 'updateSort',
        'click .delete-card': "deleteCard"
    },
    
    addCard: function(card) {
        var cardsShow = new TrelloClone.Views.CardsShow({
            model: card,
            collection: this.collection
        });
        this.addSubview(".cards-container", cardsShow);
    },
    
    deleteCard: function(event) {
        event.preventDefault();
        var $target = $(event.currentTarget);
        var cardId = $target.attr('card-id')
        var card = this.collection.get(cardId);
        card.destroy({
            success: function() {
                this.collection.remove(card);
                var that = this;
                _(this.subviews('.cards-container')).each(
                    function(view) {
                        if (view.model && view.model.attributes.id === parseInt(cardId)) {
                                that.removeSubview('.cards-container', view);
                        }
                    })
            }.bind(this)
        });
        $('.modal-backdrop').remove();
    },
    
    render: function() {
        var content = this.template({
            parentListId: this.parentListId
        });
        this.$el.html(content);
        this.attachSubviews();
        return this;
    },
    
    updateSort: function(event, movedModel, position, droppedListId) {
        if (this.collection.include(model)) {
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
                    if (ordinal >= position) {
                        ordinal += 1;
                    }
                    model.set('ord', ordinal);
                    model.save();
                }
            });
        } else {
            this.collection.forEach(function(model, index) {
                var ordinal = index;
                if (index >= position) {
                    ordinal += 1
                } else {
                    ordinal -= 1
                }
                model.set('ord', ordinal);
                model.save();
            });
            movedModel.set('ord', position);
            movedModel.set('list_id', droppedListId);
            movedModel.save();
        }
    }
})