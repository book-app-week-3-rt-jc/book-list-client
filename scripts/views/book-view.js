'use strict';

var app = app || {};

(function (module){

  var bookView = {};

  bookView.initIndexPage = () => {
    $('.container').hide();
    $('.book-view').show();
    app.Book.all.map(a => $('#book-list').append(a.toHtml()));

  };

  bookView.initNewBookPage = () => {
    $('.container').hide();
    $('#write').show();

    $('#book-form').on('submit', bookView.create);

  };

  bookView.create = event => {
    event.preventDefault();
    let book = new app.Book({
      title: $(`#book-title`).val(),
      author: $(`#book-author`).val(),
      isbn: $(`#book-isbn`).val(),
      image_url: $(`#book-image_url`).val(),
      description: $(`#book-description`).val(),
    });
    book.insertRecord();
  };

  module.bookView = bookView;

})(app);