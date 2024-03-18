import { RoleType } from '../src/app/common/constants'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const defaultPassword =
  '$2b$10$ede2tHnyXlW0byayug6MDe3LFtwpqiVxdZBCyFdfu0YsvG5clBSy6' // password

const users = [
  {
    name: 'weijie',
    password: defaultPassword,
    roles: [RoleType.ADMIN, RoleType.USER],
  },
  {
    name: 'jovia',
    password: defaultPassword,
    roles: [RoleType.ADMIN],
  },
  {
    name: 'kendrick',
    password: defaultPassword,
    roles: [RoleType.ADMIN],
  },
  {
    name: 'david',
    password: defaultPassword,
    roles: [RoleType.ADMIN],
  },
  {
    name: 'guest',
    password: defaultPassword,
    roles: [RoleType.GUEST],
  },
]

const main = async () => {
  users.forEach((user) => {
    createUserWithRole({
      name: user.name,
      password: user.password,
      roles: user.roles,
    })
  })
}

const createUserWithRole = async ({
  name,
  password,
  roles,
}: {
  name: string
  password: string
  roles: RoleType[]
}) => {
  const user = await prisma.user.create({
    data: {
      username: name,
      name,
      password,
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
