import dotenv from 'dotenv';

dotenv.config();

export const getEnv = () => {
   return {
      dbPass : process.env.MYSQL_PASSWORD,
      dbUser : process.env.MYSQL_USER,
      dbName : process.env.MYSQL_DATABASE,
      host : process.env.MYSQL_HOST,
      adminPass : process.env.ADMIN_PASS || Date.now().toString()
   }
}