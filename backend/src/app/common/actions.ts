import { Action, UnauthorizedError } from 'routing-controllers'
import { UserRepository } from '../config/db'
import JwtService from './jwtService'
import { RoleType } from './constants'

export const exclude = <T, Key extends keyof T>(
  model: T,
  keys: Key[],
): Omit<T, Key> => {
  return Object.fromEntries(
    Object.entries(model as any).filter(([key]) => !keys.includes(key as Key)),
  ) as Omit<T, Key>
}

export const validateUserRoles = async (
  action: Action,
  jwt: JwtService,
  roles: RoleType[],
): Promise<boolean> => {
  const id = jwt.decodedToken?.id

  if (!id) throw new UnauthorizedError('You are not logged in')

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

  if (!user) return false

  const userRoles: RoleType[] = user.roles.map(
    (role) => role.name,
  ) as RoleType[]

  const authorised = roles.every((role) => userRoles.includes(role))

  action.request.user = jwt.decodedToken

  return authorised
}
