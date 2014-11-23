TrelloClone.Models.Board = Backbone.Model.extend({
	urlRoot: '/api/boards',
	
	lists: function() {
		if(!this._lists) {
			this._lists = new TrelloClone.Collections.Lists([], { board: this });
		}
		return this._lists;
	},
	
	parse: function(resp) {
		if (resp.lists) {
			this.lists().set(resp.lists);
			this._lists.forEach(function(list, idx) {
				list.parse(resp.lists[idx]);
			});
			delete resp.lists;
		}
		return resp;
	},
	
});
