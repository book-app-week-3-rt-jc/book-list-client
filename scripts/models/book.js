'use strict';

var app = app || {};



(function (module){



  function Book(rawDataObject){
    this.title = rawDataObject.title;
    this.author = rawDataObject.author;
    this.isbn = rawDataObject.isbn;
    this.image_url = rawDataObject.image_url;
    this.description = rawDataObject.description;

  }
  Book.all = [];


  Book.prototype.toHtml = function(){
    let template = Handlebars.compile($('#book-list-template').text());
    return template(this);

  };

  Book.loadAll = bookData => {
    bookData.sort((a,b) => {
      let titleA = a.title.toUpperCase();
      let titleB = b.title.toUpperCase();
      return (titleA < titleB) ? -1 : 1;
    })
    Book.all = bookData.map(x => new Book(x));
  }

  Book.fetchAll = callback => {
    $.get(`https://rt-jc-booklist.herokuapp.com//api/v1/books`)
      .then(results => {
        Book.loadAll(results);
        callback();
      }, err => errorCallback());
  }; 

  module.Book = Book;

})(app);

