import { type Response, type Request } from 'express'
import expressAsyncHandler from 'express-async-handler'
import {
  type TPostUpdateResponseDto,
  type ICreatePostRequestDto,
  type IUpdatePostRequestDto,
  type TPostCreateResponseDto
} from './types'
import * as PostService from '../../services/posts'
import { verifyToken } from '../../middleware/verifyToken'

const createPost = [
  verifyToken,
  expressAsyncHandler(
    async (
      req: Request<any, any, ICreatePostRequestDto, any>,
      res: Response<TPostCreateResponseDto>
    ) => {
      const post = await PostService.createPost(req.body)
      res.json({
        success: true,
        data: [post],
        errors: []
      })
    }
  )
]

const updatePost = [
  verifyToken,
  expressAsyncHandler(
    async (
      req: Request<{ id: string }, any, IUpdatePostRequestDto, any>,
      res: Response<TPostUpdateResponseDto>
    ) => {
      await PostService.updatePost(req.params.id, req.body)
      res.json({
        success: true,
        data: [],
        errors: []
      })
    }
  )
]

export { createPost, updatePost }
