// Models handle all database interactions. They're the only layer that talks to your database.
/* 
EXAMPLE:
export const findUserByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return result[0];
}; 
*/

import db from '../../db/oktzy/db.js';

export const findUserByEmail = async (email: string) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

export const createUser = async (email: string, username: string, hashedPassword: string) => {

}
