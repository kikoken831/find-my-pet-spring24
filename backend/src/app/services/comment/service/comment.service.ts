import { Comment } from '@prisma/client'
import { NotFoundError } from 'routing-controllers'
import { CommentRepository } from '../../../config/db'

export class CommentService {
  async getAllComments(): Promise<Comment[]> {
    return await CommentRepository.findMany()
  }

  async getCommentById({ id }: { id: number }): Promise<Comment | null> {
    const comment = await CommentRepository.findUnique({
      where: {
        id,
      },
    })

    if (!comment) {
      throw new NotFoundError('HELP')
    }
    return comment
  }
}
