import { Types } from 'mongoose'
import {
  type IUpdatePostRequestDto,
  type ICreatePostRequestDto
} from '../../controllers/posts/types'
import {
  type IPostUpdateModel,
  type IPostCreateModel,
  type IPostModel
} from '../../models/post/types'
import * as PostRepository from './../../repository/posts'
import * as UserRepository from './../../repository/user'
import { type IFormattedPostDto } from './types'
import format from 'date-fns/format'
import { GenericError } from '../../appError'
import { type IUserContext } from '../../typings/request'

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
    UserRepository.getUserWithoutCredentials(postRequest.author)
  ])

  if (user != null) {
    return {
      ...(await postData.toJSON()),
      updated:
        postData.updated != null
          ? format(postData.updated, 'MM/dd/yyyy')
          : null,
      published: format(postData.published, 'MM/dd/yyyy'),
      author: user.username
    }
  }
  throw new GenericError(`No user ${postRequest.author} found`)
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

async function getPost(
  postId: string
): Promise<
  IPostModel & { _id: Types.ObjectId } & Required<{ _id: Types.ObjectId }>
> {
  const post = (await PostRepository.getPost(postId))?.toObject()
  if (post != null) {
    return post
  }

  throw new GenericError(`There is no post with id '${postId}'`)
}

async function getPosts(
  offset: number,
  count: number
): Promise<IFormattedPostDto[]> {
  const posts = await PostRepository.getPosts(count, offset)

  const transformed = posts.map(async (post) => {
    return {
      ...post.toJSON(),
      updated: post.updated != null ? format(post.updated, 'MM/dd/yyyy') : null,
      published: format(post.published, 'MM/dd/yyyy'),
      author: post.author.username
    }
  })
  return await Promise.all(transformed)
}

async function deletePost(
  postId: string,
  userContext: IUserContext
): Promise<void> {
  const { userId } = userContext
  if (userId != null) {
    const user = await UserRepository.getUserWithoutCredentials(userId)

    if (user != null) {
      await PostRepository.deletePost(postId)
      return
    }
  }
  throw new GenericError("Only post's author can delete this post")
}

export { createPost, updatePost, getPost, getPosts, deletePost }
