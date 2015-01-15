TrelloClone.Views.BoardsIndex = Backbone.View.extend({
	initialize: function() {
        this.listenTo(this.collection, 'sync remove', this.render);
	},
	
	events: {
		"click #make-new-board": "showNewBoardForm",
		"submit .new-board": "addNewBoard",
		"blur .new-board input": "closeNewBoardForm",
		"click .delete-board": 'deleteBoard',
        "click .edit-board": 'editBoard',
        "blur .editing": "closeField"
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

    editBoard: function (event) {
        event.preventDefault();
        var $target = $(event.currentTarget).parent().find('.board-index-div-content').find('p');
        this.editingId = $(event.currentTarget).attr("board-id");
        this.currentEditing = $target.replaceWith($('<input>')
                                     .val($target.text())
                                     .addClass('editing')
                                     .addClass('form-control'));
        $('.editing').focus();
    },

    closeField: function (event) {
      var $target = $(event.currentTarget);
      $target.replaceWith(this.currentEditing.text($target.val()));
      var model = this.collection.fetchOrGet(this.editingId);
      model.set('title', this.currentEditing.text());
      model.save({}, {
        success: function () {
          this.collection.set(model, { remove: false });
        }.bind(this)
      })
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