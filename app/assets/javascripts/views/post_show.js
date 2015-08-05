JournalApp.Views.PostShow = Backbone.View.extend({
  template: JST['post_show'],

  events: {
    "click button.delete-post": "deletePost",
    "click button.edit-post": "editPost",
    "dblclick h1.title": "editTitle",
    "dblclick p.body": "editBody",
    "blur .active": "save",
  },

  deletePost: function () {
    if (this.$('.active').length) { return; }
    this.model.destroy();
    this.remove();
    Backbone.history.navigate("", { trigger: true });
  },

  editPost: function () {
    if (this.$('.active').length) { return; }
    Backbone.history.navigate(
      "posts/" + this.model.id + "/edit",
      { trigger: true }
    );
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ post: this.model }));
    return this;
  },

  editTitle: function () {
    var content = $("<input type='text'></input>").addClass("edit");
    this.$("h1.title").addClass("active");
    content.val(this.model.escape("title")).attr("name", "title");
    this.$("h1.title").html(content);
  },

  editBody: function () {
    var content = $("<textarea>").addClass("edit");
    this.$("p.body").addClass("active");
    content.text(this.model.escape("body")).attr("name", "body");
    this.$("p.body").html(content);
  },

  save: function (e) {
    var input = $(e.currentTarget).find('.edit');
    var data = {};
    data[input.attr("name")] = input.val();
    var oldData = this.model.get(input.attr("name"));
    this.model.save(data,
      {
        success: function () {
          input.parent().removeClass("active");
          this.render();
        }.bind(this),

        error: function (model, response) {
          this.$("ul.edit-errors").empty();
          JSON.parse(response.responseText).forEach(function(errorText) {
            this.$("ul.edit-errors").append("<li>" + errorText + "</li>");
          }.bind(this));
          if (input.attr("name") === "body") {
            input.text(oldData);
          } else {
            input.val(oldData);
          }
        }.bind(this)
      }
    );
  },

});
