TrelloClone.Models.List = Backbone.Model.extend({
	rootUrl: function (board) {
		return "/api/boards/" + board.id + "/lists"
	}
});
