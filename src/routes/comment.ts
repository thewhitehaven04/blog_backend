import { Router } from 'express';
import { deleteCommentPost, getPostComments, postCommentPost, updateCommentPost } from '../controllers/postComment';

const postCommentRouter = Router()

postCommentRouter.post('/', postCommentPost)
postCommentRouter.delete('/:commentId', ...deleteCommentPost)
postCommentRouter.patch('/:commentId', ...updateCommentPost)
postCommentRouter.get('/', getPostComments)

export default postCommentRouter