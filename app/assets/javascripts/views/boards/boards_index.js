TrelloClone.Views.BoardsIndex = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.collection, 'sync remove', this.render);
	},
	
	events: {
		"click #make-new-board": "showNewBoardForm",
		"submit .new-board": "addNewBoard",
		"blur .new-board input": "closeNewBoardForm",
		"click .delete-board": 'deleteBoard'
	},

  template: JST['boards/index'],

	render: function() {
		var content = this.template({ boards: this.collection });
		this.$el.html(content);
		return this;
	},
	
	deleteBoard: function (event) {
		event.preventDefault();
		var $target = $(event.currentTarget);
		var boardId = $target.attr('board-id')
		var board = this.collection.get(boardId);
		board.destroy({
			success: function () {
				this.collection.remove(board);
			}
		});
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