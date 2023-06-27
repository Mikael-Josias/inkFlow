import { SignIn } from '@/controllers'
import { validateBody } from '@/middlewares'
import { signInSchema } from '@/schemas'
import { Router } from 'express'

export const sessionRouter = Router()

sessionRouter.post('/', validateBody(signInSchema), SignIn)