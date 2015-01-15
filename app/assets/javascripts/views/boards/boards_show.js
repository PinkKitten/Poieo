TrelloClone.Views.BoardsShow = Backbone.CompositeView.extend({
	
	className: "shown-board",
	
	initialize: function(options) {
		this.model = options.model;
		// this.listenTo(this.model.lists(), "add", this.render);
		this.listenTo(this.model, "sync", this.render);
		// this.listenTo(this.model.lists(), "remove", this.render);
		this.addList(this.model.lists());
	},
	
	template: JST['boards/show'],
	
	addList: function (lists) {
		var listsIndex = new TrelloClone.Views.ListsIndex({ 
			collection: lists, 
			board: this.model
		});
		this.addSubview(".lists", listsIndex);
	},
	
	render: function() {
		var content = this.template({ 
			board: this.model 
		});
		this.$el.html(content);
		this.attachSubviews();
		this.draggable();
		return this;
	},
	
	draggable: function() {
		this.$('.lists-container').sortable({
			items: "div.list",
			stop: function(event, ui) {
                neworder = new Array();
                $('div.list').each(function () {
                    var id = $(this).attr("data-id");
                    neworder.push(id);
                });
                var droppedPosition = neworder.indexOf(ui.item.attr('data-id'));
				ui.item.trigger('dropList', droppedPosition);
			}
		});
		this.$('.cards-container').sortable({
			connectWith: '.cards-container',
		  stop: function (event, ui) {
			  		ui.item.trigger('drop', [ui.item.index(), ui.item.parent().attr('data-id')]);
			  	}
		});
	}	

})