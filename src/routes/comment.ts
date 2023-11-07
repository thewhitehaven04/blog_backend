import { Router } from 'express';
import { deleteCommentPost, postCommentPost, updateCommentPost } from '../controllers/postComment';

const postCommentRouter = Router()

postCommentRouter.post('/:postId/comment', postCommentPost)
postCommentRouter.delete('/:postId/comment/:commentId', ...deleteCommentPost)
postCommentRouter.patch('/:postId/comment/:commentId', updateCommentPost)

export default postCommentRouter