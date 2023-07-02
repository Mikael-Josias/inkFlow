import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import 'dotenv/config'
import { getSession } from '@/repositories'

export async function tokenValidationMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).send('Missing header!')

  const token = authHeader.split(' ')[1]
  if (!token) return res.status(401).send('Missing token!')

  try {
    const { sessionId, id } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload

    const session = await getSession(sessionId)
    if (session.userId !== id) return res.status(401).send('Unauthorized!')

    res.locals.userId = id
    next()
  } catch (error) {
    res.status(401).send('Unauthorized!')
  }
}