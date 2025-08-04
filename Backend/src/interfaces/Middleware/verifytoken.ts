import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

interface IRequest extends Request {
  userId?: string;
}

const secret = process.env.JWT_SECRET || 'secret';

export const verifyToken = (req: IRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader)
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;


    if (decoded && typeof decoded === 'object' && 'id' in decoded ) {
      const { id } = decoded;
       
      req.userId = id;
      next();
      return
     
    } else {
      res.status(401).json({ message: 'Invalid token structure' });
    }
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};