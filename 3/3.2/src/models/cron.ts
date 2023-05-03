import cron from 'node-cron';
import { BookID } from './book';
import { dbSettings, pool } from './database';
import mysqldump from 'mysqldump';
import { getSqlQueryToDeleteConnections, SqlQuery } from './sqlQuery';
import { getTimeStamp } from '../helpers/getTimeStamp';

export default function startCron(){
   cron.schedule('0 * * * *', deleteBooks);
   cron.schedule('0 3 * * *', dumpDB);
}

async function deleteBooks() {
   const bookIDsToDelete = (await pool.query<BookID[]>(SqlQuery.getBooksIdToDelete))[0];
   if (bookIDsToDelete.length) {
      await pool.execute(getSqlQueryToDeleteConnections(bookIDsToDelete));
      await pool.execute(SqlQuery.deleteBookByFlag);
   }
}

function dumpDB() {
   mysqldump({
      connection: dbSettings,
      dumpToFile: `./sql/backups/${getTimeStamp()}.sql`
  });
}