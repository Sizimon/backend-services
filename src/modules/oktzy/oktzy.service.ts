// Service layer for Oktzy (handling main logic between controllers and models)
import bcrypt from 'bcrypt';
import { findUserByEmail, createUser, fetchClipsByUserId } from './oktzy.model.js';


// AUTH SERVICES
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



// CLIP SERVICES
export const getUserClips = async (userId: number) => {
  try {
    const clips = await fetchClipsByUserId(userId); // Call model
    return clips;
  } catch (error) {
    throw error;
  }
}

