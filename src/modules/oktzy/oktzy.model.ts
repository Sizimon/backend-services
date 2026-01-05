// Models handle all database interactions. They're the only layer that talks to your database.
/* 
EXAMPLE:
export const findUserByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return result[0];
}; 
*/