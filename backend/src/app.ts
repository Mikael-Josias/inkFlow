import { getDocumentData, updateDocumentById } from '@/services'
import { sessionRouter, userRouter, documentRouter } from './routes'
import { ErrorMiddleware } from './middlewares'
import { Server, Socket } from 'socket.io'
import { connectDb } from './config'
import { createServer } from 'http'
import express from 'express'
import cors from 'cors'
import { tokenValidationMiddleware } from './middlewares/tokenValidationMiddleware'

const app = express()
app.use(cors())
app.use(express.json())

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: true,
    methods: ['GET', 'POST']
  }
})

app
  .use('/user', userRouter)
  .use('/session', sessionRouter)
  .use('/document', tokenValidationMiddleware, documentRouter)
  .use(ErrorMiddleware)

io.on('connection', (socket: Socket) => {
  socket.on('get-document', async documentId => {
    const document = await getDocumentData(documentId)
    socket.join(documentId)
    socket.emit('load-document', document)

    socket.on('send-changes', delta => {
      socket.broadcast.to(documentId).emit('receive-changes', delta)
    })

    socket.on('save-document', async document => {
      await updateDocumentById(document)
    })
  })
})

export function init() {
  connectDb()
  return Promise.resolve(httpServer)
}

export default httpServer
