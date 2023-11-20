import { Router } from 'express'
import * as PostsController from './../controllers/posts'

const postsRouter = Router()
postsRouter.get('/', PostsController.getPosts)
postsRouter.post('/', ...PostsController.createPost)
postsRouter.patch('/:id', ...PostsController.updatePost)
postsRouter.delete('/:id', ...PostsController.deletePosts)
postsRouter.get('/:id', PostsController.getPost)

export default postsRouter
