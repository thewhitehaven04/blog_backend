import { type Schema } from 'express-validator'
import { type DefaultSchemaKeys } from 'express-validator/src/middlewares/schema'

const createPostRequestSchema: Schema<DefaultSchemaKeys> = {
  title: {
    isString: true,
    isLength: {
      options: {
        min: 2,
        max: 64
      },
      errorMessage: 'Title name should be between 2 and 64 characters long'
    },
    optional: false
  },
  text: {
    isString: true,
    optional: false,
    errorMessage: 'Post text must not be empty'
  },
  published: {
    isISO8601: true,
    optional: false,
    errorMessage: 'Published field must contain a date in the ISO8601 format'
  },
  author: {
    isString: true,
    optional: false,
    errorMessage:
      "Author field must be a string representation of author's UUID"
  },
  summary: {
    isString: true,
    isLength: {
      options: {
        min: 1,
        max: 256
      }
    },
    optional: false,
    errorMessage: 'Summary must be a non-empty string'
  }
}

const updatePostRequestSchema: Schema<DefaultSchemaKeys> = {
  title: {
    isString: true,
    isLength: {
      options: {
        min: 2,
        max: 64
      },
      errorMessage: 'Title name should be between 2 and 64 characters long'
    },
    optional: true
  },
  text: {
    isString: true,
    optional: true,
    errorMessage: 'Post text must not be empty'
  },
  summary: {
    isString: true,
    isLength: {
      options: {
        min: 1,
        max: 256
      }
    },
    optional: false
  }
}

export { createPostRequestSchema, updatePostRequestSchema }
