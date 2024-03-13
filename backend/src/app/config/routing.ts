import controllers from './controller'
import {
  Action,
  RoutingControllersOptions,
  UnauthorizedError,
} from 'routing-controllers'
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

      try {
        const authorised = await validateUserRoles(action, jwt, roles)
        resolve(authorised)
      } catch (err) {
        if (err instanceof UnauthorizedError) return new UnauthorizedError()

        resolve(false)
      }
    }),
  currentUserChecker: (action: Action) => action.request.user,
}
