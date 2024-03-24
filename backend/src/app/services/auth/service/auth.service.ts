import { BadRequestError } from 'routing-controllers'
import { UserRepository } from '../../../config/db'
import { UserWithToken } from '../../account/model/user.model'
import { IUser, UserLoginDto } from '../model/auth.model'
import JwtService from '../../../common/jwtService'
import { compareSync } from 'bcrypt'
import { RoleType } from '../../../common/constants'

export class AuthService {
  async login(userLoginDto: UserLoginDto): Promise<UserWithToken> {
    const { username, password } = userLoginDto

    const user = await UserRepository.findUnique({
      where: {
        username,
      },
      include: {
        roles: true,
      },
    })

    if (!user) throw new BadRequestError('Invalid username or password')
    const authorised = compareSync(password, user.password)
    if (!authorised) throw new BadRequestError('Invalid username or password')

    const userDto: IUser & { roles: RoleType[] } = {
      id: user.id,
      username: user.username,
      name: user.name,
      isGuest: user.isGuest,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      roles: user.roles.map((role) => role.name as RoleType),
    }
    const token = JwtService.signToken(user)

    return { ...userDto, token }
  }
}
