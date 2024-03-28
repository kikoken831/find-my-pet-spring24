import { RoleType } from '../src/app/common/constants'
import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

const defaultPassword =
  '$2b$10$ede2tHnyXlW0byayug6MDe3LFtwpqiVxdZBCyFdfu0YsvG5clBSy6' // password

interface IUser {
  name: string
  password: string
  roles: RoleType[]
  isGuest: boolean
}

const users: IUser[] = [
  {
    name: 'weijie',
    password: defaultPassword,
    roles: [RoleType.ADMIN, RoleType.USER],
    isGuest: false,
  },
  {
    name: 'jovia',
    password: defaultPassword,
    roles: [RoleType.ADMIN],
    isGuest: false,
  },
  {
    name: 'kendrick',
    password: defaultPassword,
    roles: [RoleType.ADMIN],
    isGuest: false,
  },
  {
    name: 'david',
    password: defaultPassword,
    roles: [RoleType.ADMIN],
    isGuest: false,
  },
  {
    name: 'guest',
    password: defaultPassword,
    roles: [RoleType.GUEST],
    isGuest: true,
  },
]

const main = async () => {
  users.forEach((user) => {
    createUserWithRole({
      name: user.name,
      password: user.password,
      roles: user.roles,
      isGuest: user.isGuest,
    })
  })
}

const createUserWithRole = async ({
  name,
  password,
  roles,
  isGuest,
}: {
  name: string
  password: string
  roles: RoleType[]
  isGuest: boolean
}) => {
  const user = await prisma.user.create({
    data: {
      username: name,
      name,
      password,
      isGuest,
    },
  })

  roles.forEach(async (role) => {
    await prisma.role.create({
      data: {
        name: role,
        user: {
          connect: { id: user.id },
        },
      },
    })
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
