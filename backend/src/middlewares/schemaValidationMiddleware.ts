import { NextFunction, Request, Response } from 'express'
import { ZodSchema } from 'zod'

export function validateBody(schema: ZodSchema): ValidationMiddleware {
  return validate(schema, 'body')
}

export function validateParams(schema: ZodSchema): ValidationMiddleware {
  return validate(schema, 'params')
}

function validate(schema: ZodSchema, type: 'body' | 'params') {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[type])
      next()
    } catch (error) {
      console.log(error)
      res.status(400).send({message: 'Incorrect data!'})
    }
  }
}

type ValidationMiddleware = (req: Request, res: Response, next: NextFunction) => void;