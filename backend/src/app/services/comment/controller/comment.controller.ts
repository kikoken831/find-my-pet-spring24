import { Get, JsonController, Param, UseBefore } from 'routing-controllers'
import { Comment } from '@prisma/client'
import { CommentService } from '../service/comment.service'
import { ParamsValidatorMiddleware } from '../../../middleware'

@JsonController('/comment')
@UseBefore(ParamsValidatorMiddleware)
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
