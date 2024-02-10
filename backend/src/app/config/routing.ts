import '../handlers/passport'

import { Action, RoutingControllersOptions } from 'routing-controllers'

import controllers from '../controllers'

export const routingOptions: RoutingControllersOptions = {
  cors: true,
  controllers,
  defaultErrorHandler: false,
  middlewares: [],
  authorizationChecker: () => new Promise<boolean>((resolve, reject) => {}),
  currentUserChecker: (action: Action) => action.request.user,
}
