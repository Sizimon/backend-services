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
    'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
    [username, email, hashedPassword]
  );
  return result.rows[0];
};

// CLIP MODELS
export const fetchClipsByUserId = async (userId: number) => {
  const result = await db.query('SELECT * FROM clips WHERE user_id = $1', [userId]);
  return result.rows;
};

export const createClip = async (userId: number, title: string, url: string, timestamps: any) => {
  const result = await db.query('INSERT INTO clips (user_id, title, url, timestamps) VALUES ($1, $2, $3, $4) RETURNING *', [userId, title, url, timestamps]);
  return result.rows[0];
}

export const updateClip = async (userId: number, clipId: number, title: string, timestamps: any) => {
  const result = await db.query('UPDATE clips SET title = $1, timestamps = $2 WHERE id = $3 AND user_id = $4 RETURNING *', [title, timestamps, clipId, userId]);
  return result.rows[0];
}

export const deleteClip = async (userId: number, clipId: number) => {
  const result = await db.query('DELETE FROM clips WHERE id = $1 AND user_id = $2 RETURNING *', [clipId, userId]);
  return result.rows[0];
};
