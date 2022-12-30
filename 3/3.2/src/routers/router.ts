import express, { Router } from 'express';
import { showAllBooks, showBook } from '../controllers/booksController';

export const router: Router = express.Router();

router.get('/', showAllBooks)
router.get('/book/:id', showBook)