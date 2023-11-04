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
    published: new Date(postRequest.published)
  }

  const [postData, user] = await Promise.all([
    PostRepository.savePost(post),
    UserRepository.getUser(postRequest.author)
  ])

  return {
    ...(await postData.toJSON()),
    updated:
      postData.updated != null ? format(postData.updated, 'MM/dd/yyyy') : null,
    published: format(postData.published, 'MM/dd/yyyy'),
    author: user.toObject(),
  }
}

async function updatePost(
  postId: string,
  updatePostRequest: IUpdatePostRequestDto
): Promise<void> {
  const post: IPostUpdateModel = {
    ...updatePostRequest,
    author: new Types.ObjectId(updatePostRequest.author),
    updated: new Date(),
    published: new Date(updatePostRequest.published)
  }

  await PostRepository.updatePost(postId, post)
}

export { createPost, updatePost }
