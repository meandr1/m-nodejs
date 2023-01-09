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
    let book: Book = (await pool.query<Book[]>(`SELECT * FROM books WHERE id=${id};`))[0][0];
    res.render(createPath('book-page'), { book })
}