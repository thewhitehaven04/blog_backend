import { Router } from 'express'
import * as PostsController from './../controllers/posts'

const postsRouter = Router()
postsRouter.post('/', PostsController.createPost)
postsRouter.put('/:id', PostsController.updatePost)

export default postsRouter
