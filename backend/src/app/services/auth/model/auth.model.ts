import { User } from '@prisma/client'
import { IsNotEmpty, IsString } from 'class-validator'
import { RoleType } from '../../../common/constants'

export type UserContext = {
  id: number
  roles: RoleType[]
  email: string
}

export type UserId = Pick<User, 'id'>

export type IUser = Omit<User, 'password'>

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string
}

export class UpdateUserPasswordDto {
  @IsString()
  @IsNotEmpty()
  password: string
}
