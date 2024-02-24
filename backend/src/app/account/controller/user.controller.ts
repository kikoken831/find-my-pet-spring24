import { Get, JsonController, Param } from 'routing-controllers'
import { User } from '@prisma/client'
import { UserService } from '../service/user.service'

@JsonController('/user')
export class UserController {
  @Get('/')
  async getAllUsers(): Promise<User[]> {
    return new UserService().getAllUsers()
  }

  @Get('/:id')
  async getUserById(@Param('id') id: number): Promise<User | null> {
    return new UserService().getUserById({ id })
  }
}
