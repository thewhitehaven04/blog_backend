import { Router } from 'express'
import * as PostsController from './../controllers/posts'

const postsRouter = Router()
postsRouter.post('/', PostsController.createPost)
postsRouter.post('/error', PostsController.error)

export default postsRouter
