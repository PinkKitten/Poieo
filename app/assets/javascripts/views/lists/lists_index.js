TrelloClone.Views.ListsIndex = Backbone.CompositeView.extend({
	tagName: "div",
	
	className: "",
	
	template: JST['lists/index'],
	
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
        "blur .new-list input": "closeNewListForm",
	},
	
	addListForm: function(event) {
		var $target = $(event.currentTarget);
		$target.addClass('in-active');
		$('.new-list').removeClass('in-active');
        $('#list_title').focus();
	},
	
	deleteList: function(event) {
		event.preventDefault();
		var $target = $(event.currentTarget);
		var listId = $target.attr('list-id')
		var list = this.collection.get(listId);
		list.destroy({
			success: function () {
				this.collection.remove(list);
				var that = this;
				_(this.subviews('.lists-container')).each(function(view){
					if(view.model && view.model.attributes.id === parseInt(listId) ) {
						that.removeSubview('.lists-container', view);
					}
				})
			}.bind(this)
		});
	},
	
	createNewList: function (event) {
		event.preventDefault();
		var attr =  $(event.currentTarget).serializeJSON();
		var newList = new TrelloClone.Models.List(attr['list']);
		newList.set({ board_id: this.board.id });
		newList.save({}, {
			success: function() {
				$('.new-list').addClass('in-active');
				$('#make-new-list').removeClass('in-active');
				this.collection.add(newList, {remove: false} );
				this.$('.cards-container').sortable({
					connectWith: '.cards-container',
				  stop: function (event, ui) {
					  		ui.item.trigger('drop', [ui.item.index(), ui.item.parent().attr('data-id')]);
					  	}
				});
			}.bind(this)
		})
	},
	
	updateSortLists: function(event, movedModel, position) {
        debugger
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
	
	addList: function (list) {
		var listsShow = new TrelloClone.Views.ListsShow({ 
            model: list,
            collection: this.collection 
        });
		this.addSubview(".lists-container", listsShow);
	},
	
	render: function() {
		var content = this.template();
		this.$el.html(content);
		this.attachSubviews();
		return this;
	},
	
	addNewList: function () {
		var newListShow = new TrelloClone.Views.NewListShow();
		this.addSubview(".lists-container", newListShow);
	},
    
	closeNewListForm: function(event) {
		$('.new-list').addClass('in-active');
		$('#make-new-list').removeClass('in-active');
        $('#list_title').val('');
	}
})