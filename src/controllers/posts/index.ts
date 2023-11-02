import { type Response, type Request } from 'express'
import expressAsyncHandler from 'express-async-handler'
import {
  type ICreatePostResponseDto,
  type ICreatePostRequestDto
} from './types'
import * as PostService from '../../services/posts'

const createPost = expressAsyncHandler(
  async (
    req: Request<any, any, ICreatePostRequestDto, any>,
    res: Response<ICreatePostResponseDto>
  ) => {
    const post = await PostService.createPost(req.body)
    res.json({
      success: true,
      data: {
        id: post.id
      },
      errors: []
    })
  }
)

export { createPost }
