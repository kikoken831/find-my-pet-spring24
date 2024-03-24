import { User } from '@prisma/client'
import { UserRepository } from '../../../../../config/db'
import { BadRequestError, NotFoundError } from 'routing-controllers'
import {
  CreateUserDto,
  IUser,
  UpdateUserPasswordDto,
  UserWithToken,
} from '../model/user.model'
import { hashSync } from 'bcrypt'
import { RoleType } from '../../../common/constants'
import JwtService from '../../../common/jwtService'
import { create } from 'domain'
export class UserService {
  async getAllUsers(): Promise<IUser[]> {
    return await UserRepository.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        isGuest: true,
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
        username: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        roles: true,
        isGuest: true,
        password: false,
      },
    })

    if (!user) {
      throw new NotFoundError('No User Found')
    }

    return user
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserWithToken> {
    const { password } = createUserDto

    const hashPassword = hashSync(password, 10)
    const user = await UserRepository.create({
      data: {
        username: createUserDto.username,
        name: createUserDto.name,
        password: hashPassword,
        isGuest: false,
        roles: {
          create: {
            name: RoleType.USER,
          },
        },
      },
      include: {
        roles: false,
      },
    })
    const token = JwtService.signToken(user)

    return { ...user, token }
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

  async guestLogin(): Promise<UserWithToken> {
    const guestUser = await this.createGuestUser()

    const guest = await UserRepository.findUnique({
      where: { username: guestUser.username },
      include: {
        roles: true,
      },
    })

    if (!guest) throw new NotFoundError('Guest account cannot be found')

    const userDto: IUser & { roles: RoleType[] } = {
      id: guest.id,
      username: guest.username,
      name: guest.name,
      createdAt: guest.createdAt,
      updatedAt: guest.updatedAt,
      isGuest: guest.isGuest,
      roles: guest.roles.map((role) => role.name as RoleType),
    }

    const token = JwtService.signToken(guestUser)

    return { ...userDto, token }
  }

  private createGuestUser(): Promise<User> {
    const guestDetails = this.generateUniqueUsername()
    const generatedPassword = this.generateUniquePassword(14)

    const hashPassword = hashSync(generatedPassword, 10)

    return UserRepository.create({
      data: {
        username: guestDetails,
        name: guestDetails,
        password: hashPassword,
        isGuest: true,
        roles: {
          create: {
            name: RoleType.GUEST,
          },
        },
      },
      include: {
        roles: false,
      },
    })
  }

  private generateUniqueUsername(): string {
    return `guest_${Date.now()}`
  }

  private generateUniquePassword(length: number): string {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numericChars = '0123456789'
    const specialChars = '!@#$%^&*()-_=+'

    const allChars =
      lowercaseChars + uppercaseChars + numericChars + specialChars

    let password = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length)
      password += allChars.charAt(randomIndex)
    }

    return password
  }
}
