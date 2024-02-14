import debug from 'debug'
import mongoose from 'mongoose'
import { type TRouterMap } from '../../routes/types'
import { type Application } from 'express'

const logStartup = debug('startup')

export function connectToDatabase(connectionString?: string): void {
  if (connectionString != null) {
    mongoose
      .connect(connectionString)
      .then((res) => {
        logStartup('Successful connection to the database: %o', res.connection)
      })
      .catch((err) => {
        throw new Error('Failure to connect to the database: ', err)
      })
  } else {
    throw new Error('No connection string supplied')
  }
}

export function setupRouting(app: Application, routerMap: TRouterMap): void {
  routerMap.forEach(([path, router]) => app.use(path, router))
}
