import jwt from 'jsonwebtoken';

export const getUserToken = (request) => {
  try {
    const token = request.cookies.get("AuthToken").value;
    if (!token) {
      throw new Error("Token not found");
    }
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    
    return decodedToken.id;
  } catch (error) {
    throw new Error(error.message);
  }
}
