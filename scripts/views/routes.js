'use strict';


page('/', app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/:book_id', app.Book.fetchOne(app.bookView.initIndexPage));
page('/book/new', app.bookView.initNewBookPage);