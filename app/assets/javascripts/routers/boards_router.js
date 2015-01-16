TrelloClone.Routers.Router = Backbone.Router.extend({
    initialize: function(options) {
        this.collection = options.collection;
        this.$rootEl = options.$rootEl;
    },
    
    routes: {
        "": "boardsIndex",
        "boards/:id": "boardsShow"
    },
    
    boardsIndex: function() {
        this.collection.fetch();
        var view = new TrelloClone.Views.BoardsIndex({
            collection: this.collection
        });
        this.swapView(view);
    },
    
    boardsShow: function(id) {
        model = new TrelloClone.Models.Board({
            id: id
        });
        model.fetch();
        var view = new TrelloClone.Views.BoardsShow({
            model: model
        });
        this.swapView(view);
    },
    
    swapView: function(view) {
        this._swapView && this._swapView.remove();
        this._swapView = view;
        this.$rootEl.html(view.render().$el);
    }
});