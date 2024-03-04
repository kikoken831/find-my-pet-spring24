import { User } from '@prisma/client'
import { IsNotEmpty, IsString } from 'class-validator'

export type UserId = Pick<User, 'id'>

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  password: string
}

export class UpdateUserPasswordDto {
  @IsString()
  @IsNotEmpty()
  password: string
}
