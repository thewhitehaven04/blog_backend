import { type IPostCommentRequestDto } from '../../controllers/postComment/types'
import * as PostsRepository from './../../repository/posts'
import * as CommentRepository from './../../repository/comment'
import { GenericError } from '../../appError'

async function addCommentToPost(
  postId: string,
  comment: IPostCommentRequestDto
): Promise<string> {
  const post = await PostsRepository.getPost(postId)

  if (post === null) {
    throw new GenericError(`There is no post with id ${postId}`)
  }

  const { _id } = await CommentRepository.saveComment({
    ...comment,
    created: new Date(),
    post: post.id
  })
  return _id.toString()
}

async function updatePostComment(
  commentId: string,
  text: string
): Promise<void> {
  await CommentRepository.updateComment(commentId, text)
}

export { addCommentToPost, updatePostComment }
