// Model layer for Oktzy module (handling database interactions)

import db from '../../db/oktzy/db.js';


// AUTH MODELS
export const findUserByEmail = async (email: string) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

export const findUserById = async (id: number) => {
  const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
}

export const createUser = async (email: string, username: string, hashedPassword: string) => {
  const result = await db.query(
    'INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3) RETURNING *',
    [email, username, hashedPassword]
  );
  return result.rows[0];
};

// CLIP MODELS
export const fetchClipsByUserId = async (userId: number) => {
  const result = await db.query('SELECT * FROM clips WHERE user_id = $1', [userId]);
  return result.rows;
};
