import mongoDb from '@/config/mongodb'
import { ObjectId } from 'mongodb'

const DOCUMENT_COLLECTION = 'documents'

export function createDocument(userId: string) {
  return mongoDb.collection(DOCUMENT_COLLECTION).insertOne({ userId, title: '', data: '' })
}

export function findDocumentById(id: string) {
  return mongoDb.collection(DOCUMENT_COLLECTION).findOne({ _id: new ObjectId(id) })
}

export function findAllUserDocuments(userId: string) {
  return mongoDb.collection(DOCUMENT_COLLECTION).find({ userId })
}

export function updateDocument(id: string, title: string, data: object) {
  return mongoDb.collection(DOCUMENT_COLLECTION).updateOne({_id: new ObjectId(id)}, {$set: {title, data}})
}