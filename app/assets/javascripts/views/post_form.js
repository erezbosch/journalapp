JournalApp.Views.PostForm = Backbone.View.extend({
  template: JST['post_form'],

  events: {
    "submit form": "postSave"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  postSave: function (e) {
    e.preventDefault();
    var formData = $(e.currentTarget).serializeJSON().post;
    this.model.save(formData, {
      success: function () {
        this.collection.add(this.model);
        Backbone.history.navigate("posts/" + this.model.id, {trigger: true});
      }.bind(this),
      error: function (model, response) {
        this.$("ul.form-errors").empty();
        JSON.parse(response.responseText).forEach(function(errorText) {
          this.$("ul.form-errors").append("<li>" + errorText + "</li>");
        }.bind(this));
      }
    });
  },

  render: function () {
    this.$el.html(this.template({ post: this.model }));
    return this;
  },
});
