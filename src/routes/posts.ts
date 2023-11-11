import { Router } from 'express'
import * as PostsController from './../controllers/posts'

const postsRouter = Router()
postsRouter.post('/', ...PostsController.createPost)
postsRouter.patch('/:id', ...PostsController.updatePost)
postsRouter.get('/', PostsController.getPosts)
postsRouter.delete("/:id", ...PostsController.deletePosts)

export default postsRouter
