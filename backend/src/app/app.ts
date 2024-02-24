import dotenv from 'dotenv'
import { Application } from 'express'
import {
  RoutingControllersOptions,
  createExpressServer,
} from 'routing-controllers'
import 'reflect-metadata'

dotenv.config()

export class FindMyPet {
  static initialiseApplication(routingOptions: RoutingControllersOptions) {
    const app: Application = createExpressServer(routingOptions)
    const test = 'hello'
    if (process.env.NODE_ENV === 'dev') {
      console.info('Dev mode enabled')
    }

    return app
  }
}
