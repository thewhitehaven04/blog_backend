import PostModel from '../../models/post'
import {
  type IPostCreateModel,
  type IPostUpdateModel
} from '../../models/post/types'
import { type TPostDocument } from './types'

async function savePost(post: IPostCreateModel): Promise<TPostDocument> {
  return await PostModel.create(post)
}

async function updatePost(
  postId: string,
  post: IPostUpdateModel
): Promise<void> {
  await PostModel.findByIdAndUpdate(postId, post).exec()
}


export { savePost, updatePost }
