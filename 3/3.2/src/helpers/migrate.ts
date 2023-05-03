import { readFileSync } from 'fs'
import { RowDataPacket } from 'mysql2';
import { pool } from '../models/database'
import { SqlQuery } from '../models/sqlQuery';

export async function initializeDB() {
   const booksTable = !!(await pool.query<RowDataPacket[]>(SqlQuery.checkBooksTable))[0][0];
   const authorsTable = !!(await pool.query<RowDataPacket[]>(SqlQuery.checkAuthorsTable))[0][0];
   const connectionsTable = !!(await pool.query<RowDataPacket[]>(SqlQuery.checkConnectionsTable))[0][0];
   if (!(booksTable && authorsTable && connectionsTable)) {
      await dropTables();
      await createAndFillTable('books');
      await createAndFillTable('authors');
      await createAndFillTable('connections');
   }
}

async function createAndFillTable(tableName: string) {
   const tableContents = readFileSync(`./sql/${tableName}.sql`).toString();
   const query = tableName === 'authors' ?
      SqlQuery.createAuthorsTable :
      tableName === 'books' ?
         SqlQuery.createBooksTable :
         SqlQuery.createConnectionsTable;
   await pool.execute(query);
   await pool.execute(tableContents);
}

async function dropTables() {
   await pool.execute(SqlQuery.dropConnectionsTable);
   await pool.execute(SqlQuery.dropAuthorsTable);
   await pool.execute(SqlQuery.dropBooksTable);
}