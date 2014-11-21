TrelloClone.Views.BoardsIndex = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.collection, 'sync', this.render);
	},
	
	events: {
		"click #make-new-board": "showNewBoardForm",
		"submit .new-board": "addNewBoard",
		"blur .new-board input": "closeNewBoardForm"
	},

  template: JST['boards/index'],

	render: function() {
		var content = this.template({ boards: this.collection });
		this.$el.html(content);
		return this;
	},
	
	showNewBoardForm: function(event) {
		var $target = $(event.currentTarget);
		$target.addClass('in-active');
		$('.new-board').removeClass('in-active');
	},
	
	addNewBoard: function(event) {
		event.preventDefault();
		var attributes = $(event.currentTarget).serializeJSON();
		var model = new TrelloClone.Models.Board(attributes);
		model.save({}, {
			success: function() {
				$('.new-board').addClass('in-active');
				$('#make-new-board').removeClass('in-active');
				this.collection.set(model, {remove: false} );
			}.bind(this)
		})
	},
	
	closeNewBoardForm: function(event) {
		$('.new-board').addClass('in-active');
		$('#make-new-board').removeClass('in-active');
	}
	
});