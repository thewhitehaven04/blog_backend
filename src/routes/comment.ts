import { Router } from 'express';
import { deleteCommentPost, getPostComments, postCommentPost, updateCommentPost } from '../controllers/postComment';

const postCommentRouter = Router()

postCommentRouter.post('/:postId/comment', postCommentPost)
postCommentRouter.delete('/:postId/comment/:commentId', ...deleteCommentPost)
postCommentRouter.patch('/:postId/comment/:commentId', ...updateCommentPost)
postCommentRouter.get('/:postId/comments', getPostComments)

export default postCommentRouter