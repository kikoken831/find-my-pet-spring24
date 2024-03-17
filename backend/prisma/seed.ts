import { RoleType } from '../src/app/common/constants'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const defaultPassword =
  '$2b$10$ede2tHnyXlW0byayug6MDe3LFtwpqiVxdZBCyFdfu0YsvG5clBSy6' // password

const main = async () => {
  await Promise.all([
    createUserWithRole({
      name: 'weijie',
      password: defaultPassword,
      roles: [RoleType.ADMIN, RoleType.USER],
    }),
    createUserWithRole({
      name: 'jovia',
      password: defaultPassword,
      roles: [RoleType.ADMIN],
    }),
    createUserWithRole({
      name: 'kendrick',
      password: defaultPassword,
      roles: [RoleType.ADMIN],
    }),
    createUserWithRole({
      name: 'david',
      password: defaultPassword,
      roles: [RoleType.ADMIN],
    }),
    createUserWithRole({
      name: 'guest',
      password: defaultPassword,
      roles: [RoleType.GUEST],
    }),
  ])
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
