import CommentModel from '../../models/comment'
import { type ICommentModel } from '../../models/comment/types'
import { type TCommentDocument } from './types'

async function saveComment(comment: ICommentModel): Promise<TCommentDocument> {
  return await CommentModel.create(comment)
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

export { saveComment, updateComment, deleteComment, getComment }
