import { Post } from '@prisma/client'
import { NotFoundError } from 'routing-controllers'
import { PostRepository } from '../../../config/db'

export class PostService {
  async getAllPosts(): Promise<Post[]> {
    return await PostRepository.findMany()
  }

  async getPostById({ id }: { id: number }): Promise<Post | null> {
    const post = await PostRepository.findUnique({
      where: {
        id,
      },
    })

    if (!post) {
      throw new NotFoundError('HELP')
    }
    return post
  }
}
