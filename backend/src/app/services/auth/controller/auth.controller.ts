import { Body, JsonController, Post, UseBefore } from 'routing-controllers'
import { ParamsValidatorMiddleware } from '../../../middleware'
import { AuthService } from '../service/auth.service'
import { UserLoginDto } from '../model/auth.model'
import { UserWithToken } from '../../account/model/user.model'

@JsonController('/auth')
@UseBefore(ParamsValidatorMiddleware)
export class AuthController {
  @Post('/')
  async login(
    @Body({ type: UserLoginDto }) userLoginDto: UserLoginDto,
  ): Promise<UserWithToken> {
    return new AuthService().login(userLoginDto)
  }
}
