import expressAsyncHandler from 'express-async-handler'
import { type Response, type Request } from 'express'
import {
  type IPostCommentRequestDto,
  type TPostCommentResponseDto
} from './types'
import * as CommentService from './../../services/comment'
import { type TGenericResponse } from '../types'
import { verifyTokenAndAttachAsContext } from '../../middleware/verifyToken'

const postCommentPost = [
  verifyTokenAndAttachAsContext,
  expressAsyncHandler(
    async (
      req: Request<{ postId: string }, any, IPostCommentRequestDto, any>,
      res: Response<TPostCommentResponseDto>
    ) => {
      const commentId = await CommentService.addCommentToPost(
        req.params.postId,
        req.body,
        req.context
      )
      res.json({
        success: true,
        data: [{ id: commentId }]
      })
    }
  )
]

const updateCommentPost = [
  verifyTokenAndAttachAsContext,
  expressAsyncHandler(
    async (
      req: Request<{ commentId: string }, any, any>,
      res: Response<TGenericResponse<null>>
    ) => {
      await CommentService.updatePostComment(
        req.params.commentId,
        req.body.text,
        req.context
      )
      res.json({
        success: true
      })
    }
  )
]

const deleteCommentPost = [
  verifyTokenAndAttachAsContext,
  expressAsyncHandler(
    async (
      req: Request<{ commentId: string }, any, any, any>,
      res: Response<TGenericResponse<null>>
    ) => {
      await CommentService.deletePostComment(req.params.commentId, req.context)
      res.json({
        success: true
      })
    }
  )
]

export { postCommentPost, updateCommentPost, deleteCommentPost }
