import { Role, User } from '@prisma/client'
import { IsNotEmpty, IsString, Matches } from 'class-validator'
import { RoleType } from '../../../common/constants'

export type UserContext = {
  id: number
  roles: RoleType[]
  email: string
}

export type UserId = Pick<User, 'id'>

export type IUser = Omit<User, 'password'>

export interface UserWithToken extends IUser {
  token: string
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/.{4,}/, { message: 'Userame must be at least 4 characters long' })
  username: string

  @IsString()
  @IsNotEmpty()
  @Matches(/.{4,}/, { message: 'name must be at least 4 characters long' })
  name: string

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Password must meet the specified requirements',
  })
  password: string
}

export class UpdateUserPasswordDto {
  @IsString()
  @IsNotEmpty()
  password: string
}
