import { UserController, CommentController, PostController } from '../services'
import { AuthController } from '../services/auth/controller/auth.controller'

const controllers: Array<any> = [
  UserController,
  CommentController,
  PostController,
  AuthController,
]

export default controllers
