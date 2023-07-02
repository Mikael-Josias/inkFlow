import { createDocument, getAllUserDocuments } from '@/controllers'
import { Router } from 'express'

export const documentRouter = Router()

documentRouter.post('/', createDocument)
documentRouter.get('/all', getAllUserDocuments)