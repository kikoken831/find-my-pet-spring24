import {
  Authorized,
  Body,
  CurrentUser,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  UseBefore,
} from 'routing-controllers'
import { User } from '@prisma/client'
import { UserService } from '../service/user.service'
import { ParamsValidatorMiddleware } from '../../../middleware'
import {
  CreateUserDto,
  IUser,
  UpdateUserPasswordDto,
  UserWithToken,
} from '../model/user.model'
import { RoleType } from '../../../common/constants'

@JsonController('/user')
@UseBefore(ParamsValidatorMiddleware)
export class UserController {
  @Authorized([RoleType.USER])
  @Get('/')
  async getAllUsers(): Promise<IUser[]> {
    return new UserService().getAllUsers()
  }

  @Get('/:id')
  async getUserById(@Param('id') id: number): Promise<IUser | null> {
    return new UserService().getUserById({ id })
  }

  @Post('/')
  async createUser(
    @Body({ type: CreateUserDto }) createUserDto: CreateUserDto,
  ): Promise<UserWithToken> {
    return new UserService().createUser(createUserDto)
  }

  @Authorized([])
  @Put('/:id')
  async UpdateUserPasswordById(
    @Body({ type: UpdateUserPasswordDto })
    updateUserPasswordDto: UpdateUserPasswordDto,
    @Param('id') id: number,
  ): Promise<User> {
    return new UserService().updateUserPasswordById(id, updateUserPasswordDto)
  }
}
