import { Types } from 'mongoose'
import { type IPostCommentRequestDto } from '../../controllers/postComment/types'
import * as CommentRepository from './../../repository/comment'
import * as PostService from './../../services/posts'
import { type IUserContext } from '../../typings/request'
import { GenericError } from '../../appError'
import { type ITransformedCommentDto } from './types'
import { type IPaginatedData } from '../../controllers/types/pagination'

async function addCommentToPost(
  postId: string,
  comment: IPostCommentRequestDto,
  userContext: IUserContext
): Promise<ITransformedCommentDto> {
  const post = await PostService.getPost(postId)

  if (userContext.id != null) {
    const savedComment = await CommentRepository.saveComment({
      ...comment,
      author: new Types.ObjectId(userContext.id),
      post: new Types.ObjectId(post._id),
      created: new Date()
    })
    return await savedComment.toJSON()
  }
  throw new GenericError('Invalid user')
}

async function updatePostComment(
  commentId: string,
  text: string,
  userContext: IUserContext
): Promise<void> {
  const postComment = await CommentRepository.getComment(commentId)
  if (postComment?.author.id.toString() === userContext.id) {
    await CommentRepository.updateComment(commentId, text)
    return
  }

  throw new GenericError('Cannot update comment made by another user')
}

async function deletePostComment(
  commentId: string,
  userContext: IUserContext
): Promise<void> {
  const postComment = await CommentRepository.getComment(commentId)
  if (postComment?.author.id.toString() === userContext.id) {
    await CommentRepository.deleteComment(commentId)
    return
  }

  throw new GenericError('Cannot remove comment made by another user')
}

async function getPostComments(
  postId: string,
  count: number,
  offset: number
): Promise<IPaginatedData<ITransformedCommentDto>> {
  const [comments, commentCount] = await Promise.all([
    CommentRepository.getComments(postId, count, offset),
    CommentRepository.getCommentCount(postId)
  ])

  return {
    data: await Promise.all(comments.map((comment) => comment.toJSON())),
    pagination: {
      totalCount: commentCount,
      count,
      offset
    }
  }
}

export {
  addCommentToPost,
  updatePostComment,
  deletePostComment,
  getPostComments
}
