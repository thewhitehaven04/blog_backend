import { Types } from 'mongoose'
import {
  type IUpdatePostRequestDto,
  type ICreatePostRequestDto
} from '../../controllers/posts/types'
import {
  type IPostUpdateModel,
  type IPostCreateModel
} from '../../models/post/types'
import * as PostRepository from './../../repository/posts'
import * as UserRepository from './../../repository/user'
import { type IFormattedPostDto } from './types'
import format from 'date-fns/format'

async function createPost(
  postRequest: ICreatePostRequestDto
): Promise<IFormattedPostDto> {
  const post: IPostCreateModel = {
    title: postRequest.title,
    text: postRequest.text,
    author: new Types.ObjectId(postRequest.author),
    published: new Date(postRequest.published),
    timestamp: new Date()
  }

  const [postData, user] = await Promise.all([
    PostRepository.savePost(post),
    UserRepository.getUser(postRequest.author)
  ])

  return {
    ...postData,
    updated: postData.updated != null ? format(postData.updated, 'ds') : null,
    published: format(postData.published, ''),
    author: user.toObject()
  }
}

async function updatePost(
  postId: string,
  updatePostRequest: IUpdatePostRequestDto
): Promise<void> {
  const post: IPostUpdateModel = {
    ...updatePostRequest,
    author: new Types.ObjectId(updatePostRequest.author),
    timestamp: new Date(updatePostRequest.timestamp),
    updated: new Date(),
    published: new Date(updatePostRequest.published)
  }

  await PostRepository.updatePost(postId, post)
}

export { createPost, updatePost }
