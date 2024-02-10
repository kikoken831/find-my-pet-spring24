import { Get, JsonController } from 'routing-controllers'
import { OpenAPI } from 'routing-controllers-openapi'
import { Test } from '../services/test'

@JsonController('/test')
export class TestController {
  @Get('/')
  @OpenAPI({
    security: [{ bearerAuth: [] }],
    summary: 'Get all current condo notices by notice type',
  })
  async getAllNoticeByNoticeType() {
    return new Test().getAllUsers()
  }
}
