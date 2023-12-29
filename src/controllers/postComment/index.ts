import expressAsyncHandler from 'express-async-handler'
import { type Response, type Request } from 'express'
import {
  type TGetPostCommentResponseDto,
  type IPostCommentRequestDto,
  type TPostCommentResponseDto,
  type ICommentRequestParams
} from './types'
import * as CommentService from './../../services/comment'
import { type TGenericResponse } from '../types'
import { verifyTokenAndAttachAsContext } from '../../middleware/verifyToken'
import {
  updatePostRequestSchema
} from '../posts/validator'
import { validateRequest } from '../../middleware/validation'
import { checkSchema } from 'express-validator'
import { postCommentSchema } from './validator'

const postCommentPost = [
  verifyTokenAndAttachAsContext,
  validateRequest(checkSchema(postCommentSchema)),
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
        data: { id: commentId }
      })
    }
  )
]

const updateCommentPost = [
  verifyTokenAndAttachAsContext,
  validateRequest(checkSchema(updatePostRequestSchema)),
  expressAsyncHandler(
    async (
      req: Request<{ commentId: string }, any, any>,
      res: Response<TGenericResponse>
    ) => {
      await CommentService.updatePostComment(
        req.params.commentId,
        req.body.text,
        req.context
      )
      res.json({
        success: true,
        data: null
      })
    }
  )
]

const deleteCommentPost = [
  verifyTokenAndAttachAsContext,
  expressAsyncHandler(
    async (
      req: Request<{ commentId: string }, any, any, any>,
      res: Response<TGenericResponse>
    ) => {
      await CommentService.deletePostComment(req.params.commentId, req.context)
      res.json({
        success: true,
        data: null
      })
    }
  )
]

const getPostComments = expressAsyncHandler(
  async (
    req: Request<{ postId: string }, any, any, ICommentRequestParams>,
    res: Response<TGetPostCommentResponseDto>
  ) => {
    const { count, offset } = req.query
    const { postId } = req.params
    const comments = await CommentService.getPostComments(postId, count, offset)
    res.json({
      success: true,
      data: comments
    })
  }
)

export {
  postCommentPost,
  updateCommentPost,
  deleteCommentPost,
  getPostComments
}
