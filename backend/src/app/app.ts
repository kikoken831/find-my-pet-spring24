import dotenv from 'dotenv'
import { Application } from 'express'
import {
  RoutingControllersOptions,
  createExpressServer,
} from 'routing-controllers'
import 'reflect-metadata'
import { useSwagger } from './open-api/swagger'

dotenv.config()

export class FindMyPet {
  static initialiseApplication(routingOptions: RoutingControllersOptions) {
    const app: Application = createExpressServer(routingOptions)

    if (process.env.DETAILED_ERROR_LOGS?.toString() === 'true') {
      console.info('Detailed error logs toggled on')
    }

    if (process.env.NODE_ENV === 'dev') {
      useSwagger(app)
      console.info('Dev mode enabled')
    }
    return app
  }
}
