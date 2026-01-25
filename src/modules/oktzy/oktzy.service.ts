// Service layer for Oktzy (handling main logic between controllers and models)
import bcrypt from 'bcrypt';
import { findUserByEmail, createUser, findUserById, fetchClipsByUserId, createClip, updateClip, deleteClip } from './oktzy.model.js';


// AUTH SERVICES
export const loginUser = async (email: string, password: string) => {
  try {
    const user = await findUserByEmail(email); // Call model
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isValid = await bcrypt.compare(password, user.password_hash); // Business logic
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

export const getUserById = async (userId: number) => {
  try {
    const user = await findUserById(userId); // Call model
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw error;
  }
};

// CLIP SERVICES
export const getUserClips = async (userId: number) => {
  try {
    const clips = await fetchClipsByUserId(userId); // Call model
    return clips;
  } catch (error) {
    throw error;
  }
}

export const addClip = async (userId: number, title: string, url: string, timestamps: any) => {
  try {
    const newClip = await createClip(userId, title, url, timestamps); // Call model
    return newClip;
  } catch (error) {
    throw error;
  }
}

export const editClip = async (userId: number, clipId: number, title: string, timestamps: any) => {
  try {
    const updatedClip = await updateClip(userId, clipId, title, timestamps);
    return updatedClip;
  } catch (error) {
    throw error;
  }
}

export const removeClip = async (userId: number, clipId: number) => {
  try {
    const deletedClip = await deleteClip(userId, clipId);
    return deletedClip;
  } catch (error) {
    throw error;
  }
}

