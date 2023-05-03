import { BookID, NewBook } from "./book";

export enum SqlQuery {
   getBookById = "SELECT books.*, "+
                 "GROUP_CONCAT(authors.name SEPARATOR ', ') as authors " +
                 "FROM books " +
                 "INNER JOIN connections ON books.id = connections.bookID " +
                 "INNER JOIN authors ON authors.id = connections.authorID " +
                 "WHERE books.id = ?;",
   getAllBooks = "SELECT books.*, "+
                 "GROUP_CONCAT(authors.name SEPARATOR ', ') as authors " +
                 "FROM books " +
                 "INNER JOIN connections ON books.id = connections.bookID " +
                 "INNER JOIN authors ON authors.id = connections.authorID " +
                 "GROUP BY books.id;",
   searchBooks = "SELECT books.*, "+
                 "GROUP_CONCAT(authors.name SEPARATOR ', ') as authors " +
                 "FROM books " +
                 "INNER JOIN connections ON books.id = connections.bookID " +
                 "INNER JOIN authors ON authors.id = connections.authorID " +
                 "WHERE books.name LIKE ? "+
                 "GROUP BY books.id;",
   updateViewsById = `UPDATE books SET views = views + 1 WHERE id=?;`,
   updateWantedById = `UPDATE books SET wanted = wanted + 1 WHERE id=?;`,
   getBookWantedById = `SELECT books.wanted FROM books WHERE id=?;`,
   softDeleteBookById = `UPDATE books SET deleted = 1 WHERE id=?;`,
   recoverBookById = `UPDATE books SET deleted = 0 WHERE id=?;`,
   addAuthor = `INSERT INTO authors (name) VALUES (?); SELECT LAST_INSERT_ID();`,
   getAuthorByName = `SELECT authors.id FROM authors WHERE name=?;`,
   getBookByName = `SELECT * FROM books WHERE name=?;`,
   checkBooksTable = `SHOW TABLES LIKE 'books';`,
   checkAuthorsTable = `SHOW TABLES LIKE 'authors';`,
   checkConnectionsTable = `SHOW TABLES LIKE 'connections';`,
   createBooksTable = `CREATE TABLE books (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), year INT, pages INT, description VARCHAR(255), views INT, wanted INT, deleted INT);`,
   createAuthorsTable = `CREATE TABLE authors (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL UNIQUE);`,
   createConnectionsTable = `CREATE TABLE connections (bookID INT, authorID INT, FOREIGN KEY (authorID) REFERENCES authors(id), FOREIGN KEY (bookID) REFERENCES books(id), PRIMARY KEY(bookID, authorID));`,
   getBooksIdToDelete = `SELECT books.id FROM books WHERE deleted=1;`,
   deleteBookByFlag = `DELETE FROM books WHERE deleted=1;`,
   dropConnectionsTable = 'DROP TABLE IF EXISTS connections;',
   dropAuthorsTable = 'DROP TABLE IF EXISTS authors;',
   dropBooksTable = 'DROP TABLE IF EXISTS books;'
}

export function getSqlQueryToAddBook(book: NewBook): string {
   return `INSERT INTO books (${(Object.keys(book)).join(', ')}) ` +
      `VALUES ("${(Object.values(book)).join('", "')}"); ` +
      `SELECT LAST_INSERT_ID();`;
}

export function getSqlQueryToDeleteConnections(bookIDs: BookID[]): string {
   return `DELETE FROM connections WHERE bookID=${bookIDs.map(item => item.id).join(' OR bookID=')};`;
}

export const createConnectionsQuery = (bookID: string, authorID: string) =>
  `INSERT INTO connections (bookID, authorID) VALUES (${bookID}, ${authorID});`