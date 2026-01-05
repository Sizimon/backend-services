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
