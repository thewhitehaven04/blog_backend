import { type Response, type Request } from 'express'
import expressAsyncHandler from 'express-async-handler'
import {
  type TPostUpdateResponseDto,
  type ICreatePostRequestDto,
  type IUpdatePostRequestDto,
  type TPostCreateResponseDto,
  type TPostsCollectionResponseDto,
  type IGetPostsRequestParamsDto
} from './types'
import * as PostService from '../../services/posts'
import { verifyTokenAndAttachAsContext } from '../../middleware/verifyToken'
import { createPostRequestSchema, updatePostRequestSchema } from './validator'
import { type TGenericResponse } from '../types'
import { validateRequest } from '../../middleware/validation'
import { checkSchema } from 'express-validator'

const createPost = [
  verifyTokenAndAttachAsContext,
  validateRequest(checkSchema(createPostRequestSchema)),
  expressAsyncHandler(
    async (
      req: Request<any, any, ICreatePostRequestDto>,
      res: Response<TPostCreateResponseDto>
    ) => {
      const post = await PostService.createPost(req.body)
      res.json({
        success: true,
        data: post
      })
    }
  )
]

const updatePost = [
  verifyTokenAndAttachAsContext,
  validateRequest(checkSchema(updatePostRequestSchema)),
  expressAsyncHandler(
    async (
      req: Request<{ id: string }, any, IUpdatePostRequestDto>,
      res: Response<TPostUpdateResponseDto>
    ) => {
      await PostService.updatePost(req.params.id, req.body)
      res.json({
        success: true
      })
    }
  )
]

const getPosts = [
  expressAsyncHandler(
    async (
      req: Request<IGetPostsRequestParamsDto>,
      res: Response<TPostsCollectionResponseDto>
    ) => {
      const posts = await PostService.getPosts(
        req.params.offset,
        req.params.count
      )
      res.json({
        success: true,
        data: posts
      })
    }
  )
]

const deletePosts = [
  verifyTokenAndAttachAsContext,
  expressAsyncHandler(
    async (
      req: Request<{ id: string }>,
      res: Response<TGenericResponse<null>>
    ) => {
      await PostService.deletePost(req.params.id, req.context)

      res.json({ success: true })
    }
  )
]

export { createPost, updatePost, getPosts, deletePosts }
