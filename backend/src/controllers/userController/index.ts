import { NextFunction, Request, Response } from 'express'
import { createNewUser } from '@/services'

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body

    await createNewUser(name, email, password)
    res.sendStatus(201)
  } catch (error) {
    console.log(error)
    next(error)
  }
}