import { type ICreatePostRequestDto } from '../../controllers/posts/types'

async function createPost(postRequest: ICreatePostRequestDto): Promise<void> {
  // const post: IPost = {
  //   title: postRequest.title,
  //   text: postRequest.text,
  //   // author: 'lmao',
  //   publishDate: new Date(postRequest.publishDate),
  //   timestamp: new Date()
  // }

  // await savePost(post)
}

export { createPost }
