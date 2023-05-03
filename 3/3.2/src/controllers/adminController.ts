import { createConnectionsQuery, getSqlQueryToAddBook, SqlQuery } from '../models/sqlQuery';
import { getAuthorsFromRequest } from '../helpers/authorsFromRequest';
import { createNewBook, Book, NewBook } from '../models/book';
import { createViewPath } from '../helpers/createViewPath';
import { Request, Response } from 'express';
import { saveCover } from './fsController';
import { pool } from '../models/database';
import { OkPacket, RowDataPacket } from 'mysql2';

export async function showAdminPage(req: Request, res: Response) {
  /* Books count per one page */
  const count = 20;
  const offset: number = +(req.query.offset || 0);
  const error = req.query.error;
  try {
    let books: Book[] = (await pool.query<Book[]>(SqlQuery.getAllBooks))[0];
    const pages = Math.ceil(books.length / count);
    books = books.slice(offset, count + offset);
    res.render(createViewPath('admin-page'), { books, currentPage: offset / count, pages, count, error });
  } catch (err) {
    res.status(500).send({ error: 'Something goes wrong during requesting books from DB' });
  }
}

export async function softDeleteBook(req: Request, res: Response) {
  const id: number = +req.params.id;
  const dbReq = (await pool.query<OkPacket>(SqlQuery.softDeleteBookById, [id]))[0].changedRows;
  if (dbReq) res.send({ ok: true });
  else res.status(500).send({ error: 'Error: no books were deleted' });
}

export async function recoverBook(req: Request, res: Response) {
  const id: number = +req.params.id;
  const dbReq = (await pool.query<OkPacket>(SqlQuery.recoverBookById, [id]))[0].changedRows;
  if (dbReq) res.send({ ok: true });
  else res.status(500).send({ error: 'Error: no books were recovered' });
}

export async function addBook(req: Request, res: Response) {
  let location: string = req.body.location;
  location += location.includes('?') ? '&' : '?';
  const book: NewBook = createNewBook(req);
  try {
    let authors: string[] = getAuthorsFromRequest(req);

    let books = (await pool.query<Book[]>(SqlQuery.getBookByName, [book.name]))[0];
    if (books.length) {
      location += 'error=Book is already exists';
      return res.redirect(location);
    };

    const bookID: string = (await pool.query<RowDataPacket[]>(getSqlQueryToAddBook(book)))[0][0].insertId;

    authors = await Promise.all(authors.map(async (author) => await addAuthorAndGetID(author)));
    await Promise.all(authors.map(async (authorID) => await pool.execute(createConnectionsQuery(bookID, authorID))));

    try {
      await saveCover(req, res, bookID);
      res.redirect(location);
    } catch (err) {
      res.redirect(location + "error=Unable to save cover to server files");
    }
  } catch (err) {
    res.status(500).send({ error: 'Something goes wrong during adding book to DB' });
  }
}

async function addAuthorAndGetID(author: string): Promise<string> {
  const id = (await pool.query<RowDataPacket[]>(SqlQuery.getAuthorByName, [author]))[0][0]?.id
  if (id) return id
  return (await pool.query<RowDataPacket[]>(SqlQuery.addAuthor, [author]))[0][0].insertId
}