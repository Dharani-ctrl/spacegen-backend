import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  try {
    // Get token from headers or cookies
    const token = req.headers.authorization?.split(' ')[1] || req.cookies?.adminToken;

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export default protect;
