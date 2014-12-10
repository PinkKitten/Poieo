window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
		var $rootEl = $('#main');
		var collection = new TrelloClone.Collections.Boards();
		new TrelloClone.Routers.Router({ collection: collection, $rootEl: $rootEl });
		Backbone.history.start();
  }
};


