import { User } from '@prisma/client'
import { UserRepository } from '../../../../../config/db'
import { BadRequestError, NotFoundError } from 'routing-controllers'
import {
  CreateUserDto,
  IUser,
  UpdateUserPasswordDto,
} from '../model/user.model'
import { hashSync } from 'bcrypt'
import { RoleType } from '../../../common/constants'
export class UserService {
  async getAllUsers(): Promise<IUser[]> {
    return await UserRepository.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        roles: true,
        password: false,
      },
    })
  }

  async getUserById({ id }: { id: number }): Promise<IUser | null> {
    const user = await UserRepository.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        roles: true,
        password: false,
      },
    })

    if (!user) {
      throw new NotFoundError('No User Found')
    }
    return user
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto
    const hashPassword = hashSync(password, 10)
    const user = await UserRepository.create({
      data: {
        name: createUserDto.name,
        password: hashPassword,
        roles: {
          create: {
            name: RoleType.USER,
          },
        },
      },
      include: {
        roles: true,
      },
    })

    return user
  }

  async updateUserPasswordById(
    id: number,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<User> {
    const existingUser = await UserRepository.findUnique({
      where: { id },
    })

    if (!existingUser) {
      throw new BadRequestError('User not found')
    }
    const { password } = updateUserPasswordDto

    const updatedUser = await UserRepository.update({
      where: { id },
      data: {
        password,
      },
    })

    return updatedUser
  }
}
