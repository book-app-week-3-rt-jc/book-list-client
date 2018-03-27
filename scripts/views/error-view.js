'use strict';


var app = app || {};

(function(module){
  var errorView = {};
  errorView.initErrorPage = (err) => {
    $('.container').hide();
    $('.error-view').show();
    $(`#error-message`).innerHtml = '';
    let template = Handlebars.compile($('#error-template').text());
    $(`#error-message`).append(template(err));   

  };

  function errorCallBack(error){
    console.error(error);
    errorView.initErrorPage(error);
  }




  module.errorView = errorView;
})(app);