TrelloClone.Collections.Boards = Backbone.Collection.extend({
    url: '/api/boards',
    model: TrelloClone.Models.Board,
    
    fetchOrGet: function(id) {
        var boards = this;
        var model = this.get(id);
        if (!model) {
            var model = new TrelloClone.Models.Board({
                id: id
            });
            model.fetch({
                success: function() {
                    boards.add(model);
                }
            });
        }
        return model;
    }
});