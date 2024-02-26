import { User } from '@prisma/client'
import { UserRepository } from '../../../../../config/db'
import { BadRequestError, NotFoundError } from 'routing-controllers'
import { CreateUserDto, UpdateUserPasswordDto } from '../model/user.model'

export class UserService {
  async getAllUsers(): Promise<User[]> {
    return await UserRepository.findMany()
  }

  async getUserById({ id }: { id: number }): Promise<User | null> {
    const user = await UserRepository.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      throw new NotFoundError('No User Found')
    }
    return user
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await UserRepository.create({ data: createUserDto })

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
