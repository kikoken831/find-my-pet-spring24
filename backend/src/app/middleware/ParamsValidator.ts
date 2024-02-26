// validation.middleware.ts
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers'
import { NextFunction, Request, Response } from 'express'
import { validate } from 'class-validator'

@Middleware({ type: 'before' })
export class ParamsValidatorMiddleware implements ExpressMiddlewareInterface {
  async use(req: Request, _: Response, next: NextFunction) {
    const params = { ...req.params }
    this.validateParams(params)
    next()
  }

  private validateParams(params: any): any {
    const validatedParams: any = {}
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        validatedParams[key] = params[key]
      }
    }
    return validate(validatedParams, { skipMissingProperties: true })
  }
}
