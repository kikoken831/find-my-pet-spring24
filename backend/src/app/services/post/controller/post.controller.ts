import { Get, JsonController, Param } from 'routing-controllers'
import { Post } from '@prisma/client'
import { PostService } from '../service/post.service'

@JsonController('/post')
export class PostController {
  @Get('/')
  async getAllPosts(): Promise<Post[]> {
    return new PostService().getAllPosts()
  }

  @Get('/:id')
  async getPostById(@Param('id') id: number): Promise<Post | null> {
    return new PostService().getPostById({ id })
  }
}
