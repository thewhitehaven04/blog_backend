import { Types } from 'mongoose'
import { type IPostCommentRequestDto } from '../../controllers/postComment/types'
import * as CommentRepository from './../../repository/comment'
import * as PostService from './../../services/posts'
import { type IUserContext } from '../../typings/request'
import { GenericError } from '../../appError'

async function addCommentToPost(
  postId: string,
  comment: IPostCommentRequestDto,
  userContext: IUserContext
): Promise<string> {
  const post = await PostService.getPost(postId)

  if (userContext.userId != null) {
    const { _id } = await CommentRepository.saveComment({
      ...comment,
      author: new Types.ObjectId(userContext.userId),
      post: new Types.ObjectId(post._id),
      created: new Date()
    })
    return _id.toString()
  }
  throw new GenericError('Invalid user')
}

async function updatePostComment(
  commentId: string,
  text: string,
  userContext: IUserContext
): Promise<void> {
  const postComment = await CommentRepository.getComment(commentId)
  if (postComment?.author.id.toString() === userContext.userId) {
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
  if (postComment?.author.id.toString() === userContext.userId) {
    await CommentRepository.deleteComment(commentId)
    return
  }

  throw new GenericError('Cannot remove comment made by another user')
}

export { addCommentToPost, updatePostComment, deletePostComment }
