JournalApp.Views.PostForm = Backbone.View.extend({
  template: JST['post_form'],
  tagName: 'form',

  events: {
    "click input": "postSave"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  postSave: function (e) {
    var formData = $(e.currentTarget).serializeJSON();
    debugger;
    this.model.save(formData, {
      success: function () {
        Backbone.history.navigate("posts/" + this.model.id, {trigger: true});
      },
      failure: function (e) {
        debugger;
        $("ul.form-errors").append($(e).escape("full_messages"));
      }
    });
  },

  render: function () {
    this.$el.html(this.template({ post: this.model }));
    return this;
  },
});
