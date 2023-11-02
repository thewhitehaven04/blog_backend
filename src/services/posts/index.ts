import { type ICreatePostRequestDto } from '../../controllers/posts/types'
import { type IPost } from '../../models/post/types'
import { savePost } from '../../repository/posts'
import { type TPostDocument } from '../../repository/posts/types'
import { getUser } from '../../repository/user'

async function createPost(
  postRequest: ICreatePostRequestDto
): Promise<TPostDocument> {
  const post: IPost = {
    title: postRequest.title,
    text: postRequest.text,
    author: (await getUser(postRequest.author)).id,
    publishDate: new Date(postRequest.publishDate),
    timestamp: new Date()
  }

  return await savePost(post)
}

export { createPost }
