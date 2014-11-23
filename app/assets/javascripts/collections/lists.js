TrelloClone.Collections.Lists = Backbone.Collection.extend({
  url: '/api/boards',
	// url: '/api/lists',
	//
	// url: function (board) {
	// 	return "/api/boards/" + board.id + "/lists"
	// },
	
  model: TrelloClone.Models.List

});
