import expressAsyncHandler from 'express-async-handler'
import { type Request } from 'express'
import { type IAuthRequestDto } from './types'
import { auth } from '../../services/auth'
import UserModel from '../../models/user'
import { hashSync } from 'bcrypt'

const getToken = expressAsyncHandler(
  async (req: Request<any, any, IAuthRequestDto, any>, res) => {
    await auth(req.body, (token) => {
      res.status(200).json({ token })
    })
  }
)

const postRegister = expressAsyncHandler(
  async (req: Request<any, any, IAuthRequestDto, any>, res) => {
    await UserModel.create({
      username: req.body.username,
      password: hashSync(req.body.password, 10),
      email: 'thewhitehaven04@gmail.com'
    })
    res.sendStatus(200)
  }
)

export { getToken, postRegister }
