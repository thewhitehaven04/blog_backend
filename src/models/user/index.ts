import { Schema, model } from 'mongoose'
import { type IUserModel } from './types'

const UserSchema = new Schema<IUserModel>({
  username: { type: String, required: true },
  password: {type: String, required: true },
  email: { type: String, required: true },
})

const UserModel = model('user', UserSchema)

export default UserModel
