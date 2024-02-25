import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const {
  user: UserRepository,
  post: PostRepository,
  comment: CommentRepository,
} = prisma

export { UserRepository, PostRepository, CommentRepository }
