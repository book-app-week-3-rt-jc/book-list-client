'use strict';

var app = app || {};

const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://rt-jc-booklist.herokuapp.com';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

(function (module){

  function Book(rawDataObject){
    this.title = rawDataObject.title;
    this.author = rawDataObject.author;
    this.isbn = rawDataObject.isbn;
    this.image_url = rawDataObject.image_url;
    this.description = rawDataObject.description;
    this.book_id = rawDataObject.book_id;
  }

  Book.all = [];

  Book.prototype.toHtml = function(templateType){
    let template = Handlebars.compile($(`${templateType}-template`).text());
    return template(this);

  };

  Book.loadAll = bookData => {
    bookData.sort((a,b) => {
      let titleA = a.title.toUpperCase();
      let titleB = b.title.toUpperCase();
      return (titleA < titleB) ? -1 : 1;
    });
    Book.all = bookData.map(x => new Book(x));
  };

  Book.fetchAll = callback => {
    $.get(`${ENV.apiUrl}/api/v1/books`)
      .then(results => {
        Book.loadAll(results);
        callback();
      }, err => app.errorView.errorCallback(err));
  };
  Book.fetchOne = (ctx, callback) => {
    $.get(`${ENV.apiUrl}/api/v1/books/${ctx.params.book_id}`)
      .then(results => {
        Book.loadAll(results);
        callback(ctx);
      }, err => app.errorView.errorCallback(err));
  };

  Book.fetchForm = callback => {
    $.get(`${ENV.apiUrl}/api/v1/books`)
      .then( () => {
        callback();
      }, err => app.errorView.errorCallback(err));
  };

  Book.prototype.insertBook = function(callback){
    $.post(`${ENV.apiUrl}/api/v1/books`, {title:this.title, author:this.author, isbn:this.isbn, image_url:this.image_url, description:this.description})
      .then(callback);
  };

  Book.create = event => {
    event.preventDefault();
    let book = new Book({
      title: $(`#book-title`).val(),
      author: $(`#book-author`).val(),
      isbn: $(`#book-isbn`).val(),
      image_url: $(`#book-image_url`).val(),
      description: $(`#book-description`).val(),
    });
    book.insertBook();
  };

  Book.destroy = (ctx, callback) => {
    $.ajax({
      url:`${ENV.apiUrl}/api/v1/books/${ctx.params.book_id}`,
      method: 'DELETE'
    })
      .then(console.log)
      .then(callback);
  };

  Book.populateUpdate = ctx => {
    let selected = Book.all.filter(el => el.book_id = ctx.params.book_id)[0];
    $('#update-title').text(selected.title);
    $('#update-author').text(selected.author);
    $('#update-isbn').text(selected.isbn);
    $('#update-image_url').text(selected.image_url);
    $('#update-description').text(selected.description);
  };

  Book.update = (ctx, callback) =>{
    $.ajax({
      url:`${ENV.apiUrl}/api/v1/books/${ctx.params.book_id}`,
      method: 'PUT',
      data:{
        title:$(`#update-title`).val(),
        author:$(`#update-author`).val(),
        isbn:$(`#update-isbn`).val(),
        image_url:$(`#update-image_url`).val(),
        description:$(`#update-description`).val()
      }
    })
      .then(console.log)
      .then(callback);
  };
  module.Book = Book;

})(app);

