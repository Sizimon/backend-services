// Controllers handle HTTP request/response logic. They're the bridge between HTTP and your business logic.
/* 
Example: 
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password); // Call service
    res.json({ success: true, data: result }); // Send response
  } catch (error) {
    next(error);
  }
};
*/