import expressAsyncHandler from 'express-async-handler'
import { type Response, type Request } from 'express'
import {
  type IPostCommentRequestDto,
  type IUpdateCommentRequestDto,
  type TPostCommentResponseDto
} from './types'
import * as CommentService from './../../services/comment'

const postCommentPost = expressAsyncHandler(
  async (
    req: Request<{ postId: string }, any, IPostCommentRequestDto, any>,
    res: Response<TPostCommentResponseDto>
  ) => {
    const commentId = await CommentService.addCommentToPost(
      req.params.postId,
      req.body
    )
    res.json({
      success: true,
      data: { id: commentId },
      errors: []
    })
  }
)

const updateCommentPost = expressAsyncHandler(
  async (
    req: Request<
      { postId: string; commentId: string },
      any,
      IUpdateCommentRequestDto,
      any
    >,
    res: Response<TPostCommentResponseDto>
  ) => {

  }
)

export { postCommentPost, updateCommentPost }
