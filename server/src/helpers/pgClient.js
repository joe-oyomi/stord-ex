import pg from 'pg'
import dotenv from 'dotenv';
dotenv.config();
const Pool = pg.Pool;

const { DATABASE_URL } = process.env;

const pool = new Pool({
  connectionString: DATABASE_URL
})

export const query = async (query, params = []) => {
  try {
    return pool.query(query, params);
  } catch(error) {
    throw error
  }
}