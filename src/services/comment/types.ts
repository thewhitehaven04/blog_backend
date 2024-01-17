export interface ITransformedCommentDto {
  text: string
  author: {
    email: string
    username: string
  }
  created: string
}
