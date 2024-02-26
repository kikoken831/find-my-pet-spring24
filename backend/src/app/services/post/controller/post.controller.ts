import { Get, JsonController, Param, UseBefore } from 'routing-controllers'
import { Post } from '@prisma/client'
import { PostService } from '../service/post.service'
import { ParamsValidatorMiddleware } from '../../../middleware'

@JsonController('/post')
@UseBefore(ParamsValidatorMiddleware)
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
