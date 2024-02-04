import expressAsyncHandler from 'express-async-handler'
import { type Response, type Request } from 'express'
import {
  type TGetPostCommentResponseDto,
  type IPostCommentRequestDto,
  type ICommentRequestParams,
  type IUpdateCommentRequestDto
} from './types'
import * as CommentService from './../../services/comment'
import { type TGenericResponse } from '../types/response'
import { verifyTokenAndAttachAsContext } from '../../middleware/verifyToken'
import { updatePostRequestSchema } from '../posts/validator'
import { validateRequest } from '../../middleware/validation'
import { checkSchema } from 'express-validator'
import { postCommentSchema } from './validator'
import { type ITransformedCommentDto } from '../../services/comment/types'

const postCommentPost = [
  verifyTokenAndAttachAsContext,
  validateRequest(checkSchema(postCommentSchema)),
  expressAsyncHandler(
    async (
      req: Request<any, any, IPostCommentRequestDto, any>,
      res: Response<TGenericResponse<ITransformedCommentDto>>
    ) => {
      const comment = await CommentService.addCommentToPost(
        req.body,
        req.context
      )
      res.json({
        success: true,
        data: comment 
      })
    }
  )
]

const updateCommentPost = [
  verifyTokenAndAttachAsContext,
  validateRequest(checkSchema(postCommentSchema)),
  expressAsyncHandler(
    async (
      req: Request<{ commentId: string }, any, IUpdateCommentRequestDto>,
      res: Response<TGenericResponse<ITransformedCommentDto>>
    ) => {
      const comment = await CommentService.updatePostComment(
        req.params.commentId,
        req.body.text,
        req.context
      )
      res.json({
        success: true,
        data: comment 
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
    req: Request<any, any, any, ICommentRequestParams>,
    res: Response<TGetPostCommentResponseDto>
  ) => {
    const { count, offset, postId } = req.query
    const paginatedData = await CommentService.getPostComments(
      postId,
      parseInt(count),
      parseInt(offset)
    )
    res.json({
      success: true,
      ...paginatedData
    })
  }
)

export {
  postCommentPost,
  updateCommentPost,
  deleteCommentPost,
  getPostComments
}
