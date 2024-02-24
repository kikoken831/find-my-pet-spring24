import { User } from '@prisma/client'
import { UserRepository } from '../../../../config/db'
import { NotFoundError } from 'routing-controllers'

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
      throw new NotFoundError('HELP')
    }
    return user
  }
}
