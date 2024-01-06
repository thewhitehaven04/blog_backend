export interface ITransformedCommentDataDto {
  comments: Array<{
    text: string
    author: {
      email: string
      username: string
    }
    created: string
  }>
  count: number
}
