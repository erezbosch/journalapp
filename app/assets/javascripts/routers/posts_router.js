JournalApp.Routers.PostsRouter = Backbone.Router.extend({
  routes: {
    "": "root",
    "posts/new": "postNew",
    "posts/:id/edit": "postEdit",
    "posts/:id": "postShow",
  },

  initialize: function (options) {
    this.collection = new JournalApp.Collections.Posts();
    this.$rootEl = options.$rootEl;

    this.collection.fetch();
    var view = new JournalApp.Views.PostsIndex({ collection: this.collection });

    this.$rootEl.find(".sidebar").html(view.$el);
    this.$el = this.$rootEl.find(".content");
  },

  root: function () {
    this._view = null;
    this.$el.empty();
  },

  postShow: function (id) {
    var view = new JournalApp.Views.PostShow({
      model: this.collection.getOrFetch(id)
    });
    this.swap(view);
  },

  postEdit: function (id) {
    var view = new JournalApp.Views.PostForm({
      model: this.collection.getOrFetch(id),
      collection: this.collection,
    });
    this.swap(view);
  },

  postNew: function () {
    var view = new JournalApp.Views.PostForm({
      model: new JournalApp.Models.Post(),
      collection: this.collection,
    });
    this.swap(view);
  },

  swap: function (view) {
    this._view && this._view.remove();
    this._view = view;
    this.$el.html(view.render().$el);
  }
});
