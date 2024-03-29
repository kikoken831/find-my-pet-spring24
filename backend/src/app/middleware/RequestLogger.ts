import { Request, Response } from 'express'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({
  type: 'before',
})
export class RequestLoggingMiddleware implements ExpressMiddlewareInterface {
  use(request: Request, _: Response, next: (err?: any) => any): any {
    if (!request.originalUrl.includes('/docs'))
      console.log(`${request.method} ${request.originalUrl}`)
    next()
  }
}
