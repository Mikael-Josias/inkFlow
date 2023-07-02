import { IApplicationError } from '@/common/types'
import { NextFunction, Request, Response } from 'express'

export function ErrorMiddleware(err: IApplicationError | Error, req: Request, res: Response, next: NextFunction) {
  if (err.name === 'BadRequestError') return res.status(400).send(err.message)
  if (err.name === 'NotFoundError') return res.status(404).send(err.message)
  if (err.name === 'ConflictError') return res.status(409).send(err.message)
  if (err.name === 'InternalError') return res.status(500).send(err.message)
  console.log(err)
  res.sendStatus(500)
}