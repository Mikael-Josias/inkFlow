import httpServer, { init } from './app'
import 'dotenv/config'

const PORT = process.env.PORT || 4000

init().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
  })
})