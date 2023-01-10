import { Request, Response } from 'express';
import path from 'path';
import { Book } from '../models/book'
import { pool } from '../models/database'

const createPath = (fileName: string) => path.resolve(__dirname, '..', '../views', `${fileName}.ejs`)
const count = 20;

export async function showAllBooks(req: Request, res: Response) {
    let offset = 0;
    if (req.query.offset) offset = +req.query.offset;
    let previous: boolean = offset > 0;
    let books: Book[] = (await pool.query<Book[]>(`SELECT * FROM books;`))[0];
    let next: boolean = books.length > offset + count;
    books = books.slice(offset, count + offset);
    res.render(createPath('books-page'), { books, previous, next, offset });
}

export async function showBook(req: Request, res: Response) {
    let id: number = +req.params.id;
    await pool.query(`UPDATE books SET views = views + 1 WHERE id=?;`, [id]);
    let book: Book = (await pool.query<Book[]>(`SELECT * FROM books WHERE id=?;`, [id]))[0][0];
    res.render(createPath('book-page'), { book });
}

export async function incrementBookWanted(req: Request, res: Response) {
    let id: number = -1;
    if (req.query.id) id = +req.query.id;
    await pool.query(`UPDATE books SET wanted = wanted + 1 WHERE id=?;`, [id]);
    let book: Book = (await pool.query<Book[]>(`SELECT * FROM books WHERE id=?;`, [id]))[0][0];
    res.send({wanted:book.wanted});
    // res.status(500).send({ error: 'sldkjgskldf' });
}