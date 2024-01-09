import postCommentRouter from './comment'
import postsRouter from './posts'
import tokenRouter from './token'
import signupRouter from './signup'
import { type TRouterMap } from './types'

const routerMap: TRouterMap = [
  ['/posts', postsRouter],
  ['/login', tokenRouter],
  ['/posts', postCommentRouter],
  ['/signup', signupRouter]
]

export default routerMap
