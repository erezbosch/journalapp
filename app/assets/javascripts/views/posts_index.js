JournalApp.Views.PostsIndex = Backbone.View.extend({
  template: JST['posts_index'],

  initialize: function (options) {
    this.listenTo(this.collection, "sync add reset remove", this.render);
  },

  render: function () {
    this.$el.html(this.template());
    this.collection.each(function (post) {
      var content = new JournalApp.Views.PostsIndexItem({ model: post });
      this.$('ul.posts-index-list').append(content.render().$el);
    }.bind(this));
    return this;
  },

});
