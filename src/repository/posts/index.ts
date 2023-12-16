import PostModel from '../../models/post'
import {
  type IPostCreateModel,
  type IPostUpdateModel
} from '../../models/post/types'
import { type ISecureUser } from '../../models/user/types'
import { type TPopulatedPostDocument, type TPostDocument } from './types'

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

async function getPost(postId: string): Promise<TPopulatedPostDocument | null> {
  return await PostModel.findById(postId)
    .populate<{ author: ISecureUser }>({
      path: 'author',
      select: 'username email'
    })
    .exec()
}

async function getPosts(
  count: number,
  offset: number
): Promise<TPopulatedPostDocument[]> {
  return await PostModel.find()
    .populate<{ author: ISecureUser }>({
      path: 'author',
      select: 'username email'
    })
    .sort({ published: 'desc' })
    .skip(offset)
    .limit(count)
}

async function deletePost(postId: string): Promise<void> {
  await PostModel.findByIdAndDelete(postId).exec()
}

async function getPostCount(): Promise<number> {
  return await PostModel.find().countDocuments()
}

export { savePost, updatePost, getPost, getPosts, deletePost, getPostCount }
