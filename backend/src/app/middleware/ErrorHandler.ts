/* eslint-disable dot-notation */
import { Request, Response } from 'express'
import {
  ExpressErrorMiddlewareInterface,
  HttpError,
  Middleware,
} from 'routing-controllers'

type ErrorResponseBody = {
  errorMessage: string
  errors?: Array<any>
}

@Middleware({
  type: 'after',
})
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  private static readonly SERVER_ERROR_MESSAGE: string =
    'Internal Server Error.'

  private static readonly HTTP_STATUS_CODE_SERVER_ERROR = 500

  error(error: any, _: Request, response: Response): void {
    const errorResp = this.getErrorRespBody(error)

    process.env.DETAILED_ERROR_LOGS?.toString() === 'true'
      ? console.error(error)
      : console.info(errorResp)

    response.status(
      error.httpCode || ErrorHandler.HTTP_STATUS_CODE_SERVER_ERROR,
    )

    response.json(errorResp)
  }

  private getErrorRespBody(error: Error): ErrorResponseBody {
    if (error instanceof HttpError) {
      const resp: ErrorResponseBody = {
        errorMessage: error.message,
      }
      if ((error as any).errors) {
        resp.errors = (error as any).errors
      }
      return resp
    }

    return {
      errorMessage: ErrorHandler.SERVER_ERROR_MESSAGE,
    }
  }
}
