'use strict';

// if(window.location.pathname !== '/'){
//   page.base('/book-list-client');
// }


page('/', ctx => app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/new', ctx => app.Book.fetchForm(app.bookView.initNewBookPage));
page('/books/:book_id', ctx => app.Book.fetchOne(ctx, app.bookView.initIndexPage));

page();