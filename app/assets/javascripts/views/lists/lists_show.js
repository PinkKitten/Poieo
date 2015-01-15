TrelloClone.Views.ListsShow = Backbone.CompositeView.extend({
	tagName: 'div',
	className: 'list',
    attributes: function() {
      return {
        'data-id': this.model.id
      };
    },
    
	initialize: function(options) {
		this.model = options.model;
        this.collection = options.collection;
		this.addCard(this.model, this.model.cards());
	},
    
	events: {
		'dropList': 'dropList',
		'click div.new-card-form': 'addNewCard',
		'submit .new-card': 'createNewCard',
        'click .edit-list': 'editList',
        'blur .editing': 'closeListField',
        "click .exit-card-form": "closeNewCardForm"
	},
	
  template: JST['lists/show'],
    
    editList: function (event) {
        event.preventDefault();
        var $target = $(event.currentTarget).parent().find('.list-title').find('p');
        this.currentEditing = $target.replaceWith($('<input>')
                                     .val($target.text())
                                     .addClass('editing')
                                     .addClass('form-control'));
        $('.editing').focus();
    },

    closeListField: function (event) {
      var $target = $(event.currentTarget);
      $target.replaceWith(this.currentEditing.text($target.val()));
      this.model.set('title', this.currentEditing.text());
      this.model.save({}, {
        success: function () {
          this.collection.set(this.model, { remove: false });
        }.bind(this)
      })
    },

	createNewCard: function (event) {
        debugger
		event.preventDefault();
		var attr =  $(event.currentTarget).serializeJSON();
		var newCard = new TrelloClone.Models.Card(attr['card']);
		newCard.set({ list_id: this.model.id });
		newCard.save({}, {
			success: function() {
				$('.new-card').addClass('in-active');
				$('.make-new-card').removeClass('in-active');
				this.model.cards().add(newCard);
			}.bind(this)
		})
	},
	
	addNewCard: function(event) {
		var $target = $(event.currentTarget);
		$target.find('.make-new-card').addClass('in-active');
		$target.find('.new-card').removeClass('in-active');
        $('#card_title').focus();
	},
	
	addCard: function (model, collection, options) {
		var cardsShow = new TrelloClone.Views.CardsIndex({ collection: collection, listId: this.model.id });
		this.addSubview(".cards", cardsShow);
	},
	
	dropList: function(event, index) {
		this.$el.trigger('update-sort-lists', [this.model, index]);
	},
	
	render: function() {
		var content = this.template({ list: this.model });
		this.$el.html(content);
		this.attachSubviews();
		// this.draggable();
		return this;
	},
    
	closeNewCardForm: function(event) {
		$('.new-card').addClass('in-active');
		$('.make-new-card').removeClass('in-active');
        $('.card-titles').val('');
	}
});
