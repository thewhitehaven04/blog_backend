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

export { saveComment, updateComment }
