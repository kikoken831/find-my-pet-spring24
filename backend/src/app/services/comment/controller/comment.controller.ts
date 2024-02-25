import { Get, JsonController, Param } from 'routing-controllers'
import { Comment } from '@prisma/client'
import { CommentService } from '../service/comment.service'

@JsonController('/comment')
export class CommentController {
  @Get('/')
  async getAllComments(): Promise<Comment[]> {
    return new CommentService().getAllComments()
  }

  @Get('/:id')
  async getCommentById(@Param('id') id: number): Promise<Comment | null> {
    return new CommentService().getCommentById({ id })
  }
}
