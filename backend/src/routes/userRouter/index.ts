import { validateBody } from '@/middlewares'
import { createUser } from '@/controllers'
import { signUpSchema } from '@/schemas'
import { Router } from 'express'

export const userRouter = Router()

userRouter
  .post('/', validateBody(signUpSchema), createUser)
