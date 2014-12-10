TrelloClone.Views.ListsIndex = Backbone.CompositeView.extend({
	tagName: "div",
	
	className: "",
	
	template: JST['lists/index'],
	
	initialize: function(options) {
		this.collection = options.collection;
		// this.listenTo(this.collection, 'sync', this.render);
		this.listenTo(this.collection, 'add', this.addList);
		this.collection.each(this.addList.bind(this));
	},
	
	events: {
		'update-sort': 'updateSort'
	},
	
	updateSort: function(event, movedModel, position) {
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
		debugger
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
	
	// draggable: function() {
	// 	this.$('.lists-container').sortable({
	// 		stop: function(event, ui) {
	// 			ui.item.trigger('drop', ui.item.index());
	// 		}
	// 	});
	// }
	
})