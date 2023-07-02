import { SignInUser } from '@/services/sessionService'
import { NextFunction, Request, Response } from 'express'


export async function SignIn(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body

    const token = await SignInUser(email, password)
    res.send(token)
  } catch (error) {
    next(error)
  }
}