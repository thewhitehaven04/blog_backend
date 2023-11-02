import { Schema, model } from 'mongoose'
import { type IUser } from './types'

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: {type: String, required: true },
  email: { type: String, required: true },
})

const UserModel = model('user', UserSchema)

export default UserModel
