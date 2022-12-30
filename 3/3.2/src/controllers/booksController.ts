import { Request, Response } from 'express';
import path from 'path';
import { books } from '../models/book'

const createPath = (fileName: string) => path.resolve(__dirname, '..', '../views', `${fileName}.ejs`)

export function showAllBooks(req: Request, res: Response): void {
    res.render(createPath('books-page'), { books })
}
export function showBook(req: Request, res: Response): void {
    let id: number = +req.params.id;
    let book = books[0]
    res.render(createPath('book-page'), { book })
}