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
    $.post(`${ENV.apiUrl}/api/v1/books/new`, {title:this.title, author:this.author, isbn:this.isbn, image_url:this.image_url, description:this.description})
      .then(callback);
  };

  module.Book = Book;

})(app);

