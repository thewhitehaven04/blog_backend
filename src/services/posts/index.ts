import { type FlattenMaps, Types } from 'mongoose'
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
import { GenericError } from '../../appError'
import { type IUserContext } from '../../typings/request'
import formatISO from 'date-fns/formatISO'
import { type IPaginatedData } from '../../controllers/types/pagination'
import { type TPopulatedPostDocument } from '../../repository/posts/types'

async function createPost(
  postRequest: ICreatePostRequestDto
): Promise<IFormattedPostDto> {
  const post: IPostCreateModel = {
    ...postRequest,
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
      updated: postData.updated != null ? formatISO(postData.updated) : null,
      published: formatISO(postData.published)
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
    updated: new Date()
  }

  await PostRepository.updatePost(postId, post)
}

async function getPost(
  postId: string
): Promise<FlattenMaps<IPostModel & { _id: Types.ObjectId }>> {
  const post = (await PostRepository.getPost(postId))?.toJSON()
  if (post != null) {
    return post
  }

  throw new GenericError(`There is no post with id '${postId}'`)
}

async function getFormattedPost(postId: string): Promise<IFormattedPostDto> {
  const post = await getPost(postId)
  return {
    ...post,
    updated: post.updated != null ? formatISO(post.updated) : null,
    published: formatISO(post.published)
  }
}

const transformPost = (post: TPopulatedPostDocument): IFormattedPostDto => {
  return {
    ...post.toJSON(),
    updated: post.updated != null ? formatISO(post.updated) : null,
    published: formatISO(post.published)
  }
}

async function getPosts(
  offset: number,
  count: number
): Promise<IPaginatedData<IFormattedPostDto>> {
  const [posts, totalCount] = await Promise.all([
    await PostRepository.getPosts({ count, offset }),
    await PostRepository.getPostCount()
  ])

  const transformedPosts = await Promise.all(
    posts.map(async (post) => {
      return {
        ...post.toJSON(),
        updated: post.updated != null ? formatISO(post.updated) : null,
        published: formatISO(post.published)
      }
    })
  )
  return {
    data: transformedPosts,
    pagination: {
      offset,
      count,
      totalCount
    }
  }
}

async function deletePost(
  postId: string,
  userContext: IUserContext
): Promise<void> {
  const { id } = userContext
  if (id != null) {
    const user = await UserRepository.getUserWithoutCredentials(id)

    if (user != null) {
      await PostRepository.deletePost(postId)
      return
    }
  }
  throw new GenericError("Only post's author can delete this post")
}

async function getReadMore(
  excludingPostId: string
): Promise<IPaginatedData<IFormattedPostDto>> {
  // get most recent posts
  const MORE_POSTS_COUNT = 3
  const MORE_POSTS_OFFSET = 0

  const posts = await PostRepository.getPosts({
    count: MORE_POSTS_COUNT,
    offset: MORE_POSTS_OFFSET,
    filterPosts: [excludingPostId]
  })
  const transformedPosts = posts.map((post) => transformPost(post))

  return {
    data: transformedPosts,
    pagination: {
      count: MORE_POSTS_COUNT,
      offset: MORE_POSTS_OFFSET,
      totalCount: MORE_POSTS_COUNT
    }
  }
}

export {
  createPost,
  updatePost,
  getPost,
  getPosts,
  deletePost,
  getFormattedPost,
  getReadMore
}
