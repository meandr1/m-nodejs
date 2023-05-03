import auth from 'express-basic-auth';
import express, { Router } from 'express';
import { showAllBooks, showBook, incrementBookWanted } from '../controllers/userController';
import { addBook, recoverBook, showAdminPage, softDeleteBook } from '../controllers/adminController';
import { getEnv } from '../models/env';

export const router: Router = express.Router();
const env = getEnv();

const authOptions = {
   challenge: true,
   users: { admin: env.adminPass }
};

router.get('/', showAllBooks);
router.get('/book/:id', showBook);
router.get('/api/v1/book/', incrementBookWanted);
router.get('/admin/api/v1/', auth(authOptions), showAdminPage);
router.put('/admin/api/v1/delete/book/:id', auth(authOptions), softDeleteBook);
router.put('/admin/api/v1/recover/book/:id', auth(authOptions), recoverBook);
router.post('/admin/api/v1/add/book/', auth(authOptions), addBook);