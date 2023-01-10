import express, { Router } from 'express';
import { showAllBooks, showBook, incrementBookWanted } from '../controllers/booksController';

export const router: Router = express.Router();

// router.all('*', function (req, res, next) {
//     console.log(req.url);
//     console.log(req.method);
//     console.log(req.body);
//     next();
//   });

router.get('/', showAllBooks)
router.get('/book/:id', showBook)
router.get('/api/v1/books/', incrementBookWanted)