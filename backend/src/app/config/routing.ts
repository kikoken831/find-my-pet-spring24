import controllers from './controller'
import { Action, RoutingControllersOptions } from 'routing-controllers'
import { ErrorHandler, RequestLoggingMiddleware } from '../middleware'
import { RoleType } from '../common/constants'
import JwtService from '../common/jwtService'
import { validateUserRoles } from '../common/actions'

export const routingOptions: RoutingControllersOptions = {
  cors: true,
  controllers,
  defaultErrorHandler: false,
  middlewares: [RequestLoggingMiddleware, ErrorHandler],
  authorizationChecker: (action: Action, roles: RoleType[]) =>
    new Promise<boolean>(async (resolve, _) => {
      const jwt = new JwtService(action.request.headers['authorization'])

      if (!jwt.isTokenValid()) resolve(false)

      const authorised = await validateUserRoles(action, jwt, roles)

      resolve(authorised)
    }),
  currentUserChecker: (action: Action) => action.request.user,
}
