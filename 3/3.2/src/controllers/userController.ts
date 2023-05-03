import { Request, Response } from 'express';
import { Book, BookWanted } from '../models/book';
import { pool } from '../models/database';
import { SqlQuery } from '../models/sqlQuery';
import { createViewPath } from '../helpers/createViewPath';
import { prepareSearchString } from '../helpers/prepareSearchString';

export async function showAllBooks(req: Request, res: Response) {
    /* Books count per one page */
    const count = 20;
    const offset: number = +(req.query.offset || 0)
    let searchString = req.query.search;
    const previous: boolean = offset > 0;
    try {
        let books: Book[];
        if (searchString) {
            searchString = prepareSearchString(searchString + "");
            books = (await pool.query<Book[]>(SqlQuery.searchBooks, ['%' + searchString + '%']))[0];
        } else {
            books = (await pool.query<Book[]>(SqlQuery.getAllBooks))[0];
        }

        const next: boolean = books.length > offset + count;
        books = books.slice(offset, count + offset);
        res.render(createViewPath('books-page'), { books, previous, next, offset, search: searchString || '' });
    } catch (err) {
        res.status(500).send({ error: 'Something goes wrong during requesting books from DB' });
    }
}

export async function showBook(req: Request, res: Response) {
    const id: number = +req.params.id;
    await pool.execute(SqlQuery.updateViewsById, [id]);
    const book: Book = (await pool.query<Book[]>(SqlQuery.getBookById, [id]))[0][0];
    if (book) res.render(createViewPath('book-page'), { book });
    else internalError(id, res);
}

export async function incrementBookWanted(req: Request, res: Response) {
    let id: number = -1;
    if (req.query.id) id = +req.query.id;
    await pool.execute(SqlQuery.updateWantedById, [id]);
    const bookWanted: BookWanted = (await pool.query<BookWanted[]>(SqlQuery.getBookWantedById, [id]))[0][0];
    if (bookWanted) res.send(bookWanted);
    else internalError(id, res);
}

function internalError(bookId: number, res: Response) {
    res.status(500).send({ error: `Can't find book id=${bookId}` });
}