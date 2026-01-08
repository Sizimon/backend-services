// Services contain all your business rules and orchestrate operations. This is where the "what" happens.
/*
EXAMPLE:
export const loginUser = async (email, password) => {
  const user = await findUserByEmail(email); // Call model
  if (!user) throw new Error('Invalid credentials');
  
  const isValid = await bcrypt.compare(password, user.password); // Business logic
  if (!isValid) throw new Error('Invalid credentials');
  
  const token = generateToken(user.id); // Business logic
  return { user, token };
};
*/

import bcrypt from 'bcrypt';
import { findUserByEmail, createUser } from './oktzy.model.js';

export const loginUser = async (email: string, password: string) => {
  try {
    const user = await findUserByEmail(email); // Call model
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isValid = await bcrypt.compare(password, user.password); // Business logic
    if (!isValid) {
      throw new Error('Invalid credentials');
    }
    return user;
  } catch (error) {
    throw error;
  }
}

export const registerUser = async (email: string, username: string, password: string) => {
  try {
    const existingUser = await findUserByEmail(email); // Call model
    if (existingUser) {
      throw new Error('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(email, username, hashedPassword); // Call model
    return newUser;
  } catch (error) {
    throw error;
  }
}
