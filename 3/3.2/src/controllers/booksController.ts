import { Request, Response } from 'express';
import path from 'path';
import { Book, books2 } from '../models/book'

const createPath = (fileName: string) => path.resolve(__dirname, '..', '../views', `${fileName}.ejs`)
const count = 20;

export function showAllBooks(req: Request, res: Response): void {
    let offset = 0;
    if (req.query.offset) offset = +req.query.offset;
    let previous: boolean = offset > 0;
    let next: boolean = books2.length > offset + count;
    let books: Book[] = books2.slice(offset, count + offset);

    res.render(createPath('books-page'), { books, previous, next, offset })
}

export function showBook(req: Request, res: Response): void {
    let id: number = +req.params.id;
    let book = books2.reduce((res, book) => (res = book.id == id ? book : res));
    res.render(createPath('book-page'), { book })
}