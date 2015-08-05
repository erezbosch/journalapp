JournalApp.Views.PostShow = Backbone.View.extend({
  template: JST['post_show'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ post: this.model }));
    return this;
  },
});
