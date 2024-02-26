import '../middleware/passport'
import controllers from './controller'
import { Action, RoutingControllersOptions } from 'routing-controllers'
import { ErrorHandler, RequestLoggingMiddleware } from '../middleware'

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
