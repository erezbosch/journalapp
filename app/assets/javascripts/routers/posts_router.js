JournalApp.Routers.PostsRouter = Backbone.Router.extend({
  routes: {
    "": "postsIndex",
    "posts/:id/edit": "postEdit",
    "posts/:id": "postShow",
  },

  initialize: function (options) {
    this.collection = new JournalApp.Collections.Posts();
    this.collection.fetch();
    this.$rootEl = options.$rootEl;
  },

  postsIndex: function () {
    var view = new JournalApp.Views.PostsIndex({collection: this.collection});
    this.$rootEl.html(view.$el);
    this.swap(view);
  },

  postShow: function (id) {
    var view = new JournalApp.Views.PostShow({
      model: this.collection.getOrFetch(id)
    });
    this.$rootEl.html(view.$el);
    this.swap(view);
  },

  postEdit: function (id) {
    var view = new JournalApp.Views.PostForm({
      model: this.collection.getOrFetch(id)
    });
    this.$rootEl.html(view.$el);
    this.swap(view);
  },

  swap: function (view) {
    this._view && this._view.remove();
    this._view = view;
    return this;
  }
});
