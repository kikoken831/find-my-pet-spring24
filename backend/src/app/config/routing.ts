import '../handlers/passport'

import { Action, RoutingControllersOptions } from 'routing-controllers'

import controllers from './controller'
import { ErrorHandler } from '../middleware/ErrorHandler'
import { RequestLoggingMiddleware } from '../middleware/RequestLogger'

export const routingOptions: RoutingControllersOptions = {
  cors: true,
  controllers,
  defaultErrorHandler: false,
  middlewares: [RequestLoggingMiddleware, ErrorHandler],
  authorizationChecker: () =>
    new Promise<boolean>((resolve, reject) => {
      return true
    }),
  currentUserChecker: (action: Action) => action.request.user,
}
