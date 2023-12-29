import { type Schema } from 'express-validator'
import { type DefaultSchemaKeys } from 'express-validator/src/middlewares/schema'

export const postCommentSchema: Schema<DefaultSchemaKeys> = {
  text: {
    isString: true,
    trim: true,
    isLength: {
      options: {
        min: 1
      }
    }
  }
}
