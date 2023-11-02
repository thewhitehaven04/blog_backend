import PostModel from '../../models/post'
import { type IPost } from '../../models/post/types'
import { type TPostDocument } from './types'

async function savePost(post: IPost): Promise<TPostDocument> {
  return await PostModel.create(post)
}

export { savePost }
