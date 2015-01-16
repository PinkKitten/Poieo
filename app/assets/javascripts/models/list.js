TrelloClone.Models.List = Backbone.Model.extend({
    urlRoot: '/api/lists',
    
    cards: function() {
        if (!this._cards) {
            this._cards = new TrelloClone.Collections.Cards([], {
                board: this
            });
        }
        return this._cards;
    },
    
    parse: function(resp) {
        if (resp.cards) {
            this.cards().set(resp.cards);
            delete resp.cards;
        }
        return resp;
    },
    
    toJSON: function() {
        var json = Backbone.Model.prototype.toJSON.call(this);
        delete json.id;
        delete json.created_at;
        delete json.updated_at;
        return json;
    }
});
