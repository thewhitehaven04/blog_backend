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

async function updateComment(id: string, commentText: string): Promise<void> {
  await CommentModel.findByIdAndUpdate(id, {
    $set: { text: commentText }
  })
}

async function deleteComment(commentId: string): Promise<void> {
  await CommentModel.findByIdAndDelete(commentId)
}

async function getComment(commentId: string): Promise<TCommentDocument | null> {
  return await CommentModel.findById(commentId).exec()
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

async function getCommentCount(): Promise<number> {
  return await CommentModel.countDocuments()
}

export {
  saveComment,
  updateComment,
  deleteComment,
  getComment,
  getComments,
  getCommentCount
}
