TrelloClone.Models.List = Backbone.Model.extend({
	rootUrl: function (board) {
		return "/api/boards/" + board.id + "/lists"
	},
	
	cards: function() {
		if(!this._cards) {
			this._cards = new TrelloClone.Collections.Cards([], { board: this });
		}
		return this._cards;
	},
	
	parse: function(resp) {
		if (resp.cards) {
			this.cards().set(resp.cards);
			delete resp.cards;
		}
		return resp;
	}
});
