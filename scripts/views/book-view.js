'use strict';

var app = app || {};

(function (module){

  var bookView = {};

  bookView.initIndexPage = () => {
    $('.container').hide();
    $('.book-view').show();
    app.Book.all.map(a => $('#book-list').append(a.toHtml('#book-list')));
  };

  bookView.initAboutPage = () => {
    $('.container').hide();
    $('.about-view').show();
  };

  bookView.initDetailPage = (ctx) => {
    $('.container').hide();
    $('#detail-list').empty();
    $('.detail-view').show();
    let selected = app.Book.all.filter(el => el.book_id = ctx.params.book_id);
    $('#detail-list').append(selected[0].toHtml('#detail-list'));
  };

  bookView.initNewBookPage = () => {
    $('.container').hide();
    $('.form-view').show();
    $('#book-form').on('submit', app.Book.create);

  };

  bookView.initUpdateFormPage = (ctx) => {
    $(`.container`).hide();
    $(`.update-view`).show();
    $(`#update-form`).append(app.Book.populateUpdate);
    $(`#update-form`).on('submit', ctx => app.Book.update(ctx));


  };




  module.bookView = bookView;

})(app);