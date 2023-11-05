export interface IUser {
  username: string
  password: string
  email: string
}

export interface ISecureUser extends Omit<IUser, 'password'> {}
