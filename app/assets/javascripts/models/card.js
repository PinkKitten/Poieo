TrelloClone.Models.Card = Backbone.Model.extend({
	
	rootUrl: function (list) {
		return "/api/boards/" + list.get('board_id') + "/lists/" + list.id + "/cards"
	},
	
	
});
