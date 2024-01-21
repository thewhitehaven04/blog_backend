import { type Response, type Request } from 'express'
import expressAsyncHandler from 'express-async-handler'
import {
  type TPostUpdateResponseDto,
  type ICreatePostRequestDto,
  type IUpdatePostRequestDto,
  type TPostCreateResponseDto,
  type TPostsCollectionResponseDto,
  type IGetPostsRequestParamsDto,
  type TPostResponseDto
} from './types'
import * as PostService from '../../services/posts'
import { verifyTokenAndAttachAsContext } from '../../middleware/verifyToken'
import { createPostRequestSchema, updatePostRequestSchema } from './validator'
import { type TGenericResponse } from '../types/response'
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
        success: true,
        data: null
      })
    }
  )
]

const getPosts = expressAsyncHandler(
  async (
    req: Request<any, any, any, IGetPostsRequestParamsDto>,
    res: Response<TPostsCollectionResponseDto>
  ) => {
    const { data, pagination } = await PostService.getPosts(
      req.query.offset,
      req.query.count
    )
    res.json({
      success: true,
      data,
      pagination
    })
  }
)

const deletePosts = [
  verifyTokenAndAttachAsContext,
  expressAsyncHandler(
    async (req: Request<{ id: string }>, res: Response<TGenericResponse>) => {
      await PostService.deletePost(req.params.id, req.context)
      res.json({ success: true, data: null })
    }
  )
]

const getPost = expressAsyncHandler(
  async (req: Request<{ id: string }>, res: Response<TPostResponseDto>) => {
    const post = await PostService.getFormattedPost(req.params.id)
    res.json({ success: true, data: post })
  }
)

const getReadMore = expressAsyncHandler(
  async (
    req: Request<any, any, any, { excludingPost: string }>,
    res: Response<TPostsCollectionResponseDto>
  ) => {
    const { data, pagination } = await PostService.getReadMore(
      req.query.excludingPost
    )

    res.json({
      success: true,
      data,
      pagination
    })
  }
)

export { createPost, updatePost, getPosts, deletePosts, getPost, getReadMore }
