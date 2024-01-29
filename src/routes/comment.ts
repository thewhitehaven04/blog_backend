import { Router } from 'express';
import { deleteCommentPost, getPostComments, postCommentPost, updateCommentPost } from '../controllers/postComment';

const postCommentRouter = Router()

postCommentRouter.post('/comment', postCommentPost)
postCommentRouter.delete('/comment/:commentId', ...deleteCommentPost)
postCommentRouter.patch('/comment/:commentId', ...updateCommentPost)
postCommentRouter.get('/comment', getPostComments)

export default postCommentRouter