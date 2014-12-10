TrelloClone.Views.ListsIndex = Backbone.CompositeView.extend({
	tagName: "div",
	
	className: "",
	
	template: JST['lists/index'],
	
	initialize: function(options) {
		this.collection = options.collection;
		this.board = options.board;
		// this.listenTo(this.collection, 'sync', this.render);
		this.listenTo(this.collection, 'add', this.addList);
		this.collection.each(this.addList.bind(this));
		this.addNewList();
	},
	
	events: {
		'update-sort-lists': 'updateSortLists',
		'click .create-new-list': 'addListForm',
		'submit .new-list': 'createNewList'
	},
	
	addListForm: function(event) {
		var $target = $(event.currentTarget);
		$target.addClass('in-active');
		$('.new-list').removeClass('in-active');
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
				this.collection.set(newList, {remove: false} );
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
		var listsShow = new TrelloClone.Views.ListsShow({ model: list });
		this.addSubview(".lists-container", listsShow);
	},
	
	render: function() {
		var content = this.template();
		this.$el.html(content);
		this.attachSubviews();
		// this.draggable();
		return this;
	},
	
	addNewList: function () {
		var newListShow = new TrelloClone.Views.NewListShow();
		this.addSubview(".lists-container", newListShow);
	}
	// draggable: function() {
	// 	this.$('.lists-container').sortable({
	// 		stop: function(event, ui) {
	// 			ui.item.trigger('drop', ui.item.index());
	// 		}
	// 	});
	// }
	
})