import { config } from 'dotenv'
import express from 'express'
import { connectToDatabase, setupRouting } from './services/startup'
import cors from 'cors'
import routerMap from './routes/routeMap'
import { genericErrorHandler } from './middleware/error'
import { userContext } from './middleware/userContext'

config()
connectToDatabase(process.env.CONNECTION_STRING)

const app = express()
app.use(userContext)
app.use(cors())
app.use(express.json())

setupRouting(app, routerMap)
app.use(genericErrorHandler)

app.listen(process.env.PORT)
