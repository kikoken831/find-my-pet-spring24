import { UserController } from '../services/account/controller/user.controller'
import { CommentController } from '../services/comment/controller/comment.controller'
import { PostController } from '../services/post/controller/post.controller'

const controllers: Array<any> = [
  UserController,
  CommentController,
  PostController,
]

export default controllers
