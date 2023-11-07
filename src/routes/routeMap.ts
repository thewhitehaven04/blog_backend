import postCommentRouter from './comment'
import postsRouter from './posts'
import tokenRouter from './token'
import { type TRouterMap } from './types'

const routerMap: TRouterMap = [
  ['/posts', postsRouter],
  ['/login', tokenRouter],
  ['/posts', postCommentRouter]
]

export default routerMap
