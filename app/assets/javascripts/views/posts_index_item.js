JournalApp.Views.PostsIndexItem = Backbone.View.extend({
  template: JST["posts_index_item"],
  tagName: "li",

  render: function () {
    this.$el.html(this.template( {post: this.model}) );
    return this;
  }
});
