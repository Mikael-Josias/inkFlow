import { createNewDocument, getAllDocumentsByUserId } from '@/services'
import { NextFunction, Request, Response } from 'express'


export async function createDocument(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = res.locals

    const documentId = await createNewDocument(userId)
    res.status(201).send({documentId})
  } catch (error) {
    next(error)
  }
} 

export async function getAllUserDocuments(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = res.locals
    
    const documents = await getAllDocumentsByUserId(userId)
    res.send(documents)
  } catch (error) {
    next(error)
  }
}