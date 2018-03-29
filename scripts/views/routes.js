'use strict';

page('/', ctx => app.Book.fetchAll(app.bookView.initIndexPage));
page('/about', ctx => app.bookView.initAboutPage);
page('/books/new', ctx => app.Book.fetchForm(app.bookView.initNewBookPage));
page('/books/:book_id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage));

page();