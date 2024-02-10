import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const { user: UserRepository } = prisma

export { UserRepository };