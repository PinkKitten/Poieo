TrelloClone.Views.ListsIndex = Backbone.CompositeView.extend({
    
    template: JST['lists/index'],
    tagName: "div",
    className: "",
    
    initialize: function(options) {
        this.collection = options.collection;
        this.board = options.board;
        this.listenTo(this.collection, 'add', this.addList);
        this.collection.each(this.addList.bind(this));
        this.addNewList();
    },
    
    events: {
        'update-sort-lists': 'updateSortLists',
        'click .create-new-list': 'addListForm',
        'submit .new-list': 'createNewList',
        'click .delete-list': 'deleteList',
        "click button.close-form": "closeNewListForm",
    },
    
    addList: function(list) {
        var listsShow = new TrelloClone.Views.ListsShow({
            model: list,
            collection: this.collection
        });
        this.addSubview(".lists-container", listsShow);
    },
    
    addListForm: function(event) {
        var $target = $(event.currentTarget);
        $target.addClass('in-active');
        $('.new-list').removeClass('in-active');
        $('#list_title').focus();
    },
    
    addNewList: function() {
        var newListShow = new TrelloClone.Views.NewListShow();
        this.addSubview(".lists-container", newListShow);
    },
    
    closeNewListForm: function(event) {
        $('div.list-error-message').hide();
        $('.new-list').addClass('in-active');
        $('#make-new-list').removeClass('in-active');
        $('#list_title').val('');
    },
    
    createNewList: function(event) {
        event.preventDefault();
        $('div.list-error-message').hide();
        var attr = $(event.currentTarget).serializeJSON();
        var newList = new TrelloClone.Models.List(attr['list']);
        newList.set({
            board_id: this.board.id,
            ord: this.collection.length
        });
        newList.save({}, {
            success: function() {
                $('.new-list').addClass('in-active');
                $('#make-new-list').removeClass('in-active');
                this.collection.add(newList, {remove: false});
                this.$('.cards-container').sortable({
                    connectWith: '.cards-container',
                    stop: function(event, ui) {
                        ui.item.trigger('dropCard', [ui.item.index(), ui.item.parent().attr('data-id')]);
                    }
                });
                $('#list_title').val('');
            }.bind(this),
            error: function() {
                $('div.list-error-message').show();
            }
        })
    },
    
    deleteList: function(event) {
        event.preventDefault();
        var $target = $(event.currentTarget);
        var listId = $target.attr('list-id')
        var list = this.collection.get(listId);
        list.destroy({
            success: function() {
                this.collection.remove(list);
                var that = this;
                _(this.subviews('.lists-container')).each(
                    function(view) {
                        if (view.model && view.model.attributes.id === parseInt(listId)) {
                            that.removeSubview('.lists-container', view);
                        }
                    })
            }.bind(this)
        });
    },
    
    render: function() {
        var content = this.template();
        this.$el.html(content);
        this.attachSubviews();
        return this;
    },
    
    updateSortLists: function(event, movedModel, position) {
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
    },
})