JournalApp.Views.PostsIndexItem = Backbone.View.extend({
  template: JST["posts_index_item"],
  tagName: "li",
  events: {
    "click button.delete-post": "deletePost",
    "click button.edit-post": "editPost"
  },

  deletePost: function () {
    this.model.destroy();
    this.remove();
  },

  editPost: function () {
    Backbone.history.navigate("posts/" + this.model.id + "/edit");
  },

  render: function () {
    this.$el.html(this.template( {post: this.model}) );
    return this;
  }
});
