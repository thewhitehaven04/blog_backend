import { config } from 'dotenv'
import express from 'express'
import { connectToDatabase, setupRouting } from './services/startup'
import cors from 'cors'
import routerMap from './routes/routeMap'

config()
connectToDatabase(process.env.CONNECTION_STRING)

const app = express()
setupRouting(app, routerMap)
app.use(cors())

app.listen(process.env.PORT)
