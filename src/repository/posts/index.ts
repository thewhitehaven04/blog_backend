import PostModel from '../../models/post'
import {
  type IPostCreateModel,
  type IPostUpdateModel
} from '../../models/post/types'
import { type TPostDocument } from './types'

async function savePost(post: IPostCreateModel): Promise<TPostDocument> {
  return await PostModel.create({
    ...post,
    updated: new Date()
  })
}

async function updatePost(
  postId: string,
  post: IPostUpdateModel
): Promise<void> {
  await PostModel.findByIdAndUpdate(postId, post).exec()
}

async function getPost(postId: string): Promise<TPostDocument | null> {
  return await PostModel.findById(postId).exec()
}

export { savePost, updatePost, getPost }
