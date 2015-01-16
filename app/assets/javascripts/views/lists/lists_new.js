TrelloClone.Views.NewListShow = Backbone.CompositeView.extend({
    
    template: JST['lists/new'],
    
    render: function() {
        var content = this.template();
        this.$el.html(content);
        return this;
    }
});