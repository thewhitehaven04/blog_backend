import postsRouter from './posts'
import tokenRouter from './token'
import { type TRouterMap } from './types'

const routerMap: TRouterMap = [
  ['/posts', postsRouter],
  ['/login', tokenRouter]
]

export default routerMap
