import { GenericError } from '../../appError'
import CommentModel from '../../models/comment'
import { type ICommentModel } from '../../models/comment/types'
import { type ISecureUser } from '../../models/user/types'
import { type TPopulatedCommentDocument, type TCommentDocument } from './types'

async function saveComment(
  comment: ICommentModel
): Promise<TPopulatedCommentDocument> {
  return await (
    await CommentModel.create(comment)
  ).populate<{ author: ISecureUser }>({
    path: 'author',
    select: 'username email'
  })
}

async function updateComment(
  id: string,
  commentText: string
): Promise<TPopulatedCommentDocument | null> {
  return await CommentModel.findByIdAndUpdate(
    id,
    {
      $set: { text: commentText }
    },
    { returnDocument: 'after' }
  ).populate<{ author: ISecureUser }>({
    path: 'author',
    select: 'username email'
  })
}

async function deleteComment(commentId: string): Promise<void> {
  await CommentModel.findByIdAndDelete(commentId)
}

async function getComment(commentId: string): Promise<TCommentDocument> {
  const comment = await CommentModel.findById(commentId).exec()
  if (comment != null) {
    return comment
  }
  throw new GenericError(`There is no comment with id ${commentId}`)
}

async function getComments(
  postId: string,
  count: number,
  offset: number
): Promise<TPopulatedCommentDocument[]> {
  return await CommentModel.find({ post: postId })
    .sort({ created: 'desc' })
    .skip(offset)
    .limit(count)
    .populate<{ author: ISecureUser }>({
      path: 'author',
      select: 'username email'
    })
}

async function getCommentCount(postId: string): Promise<number> {
  return await CommentModel.find({ post: postId }).countDocuments()
}

export {
  saveComment,
  updateComment,
  deleteComment,
  getComment,
  getComments,
  getCommentCount
}
