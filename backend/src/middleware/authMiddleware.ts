import { config } from '@src/config'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const { JWT_SECRET } = config

type DecodedToken = { userId?: number }
export type AuthRequest = Request & DecodedToken

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken
    req.userId = decoded.userId
    next()
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' })
  }
}
