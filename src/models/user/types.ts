export interface IUserModel {
  username: string
  password: string
  email: string
}

export interface ISecureUser extends Omit<IUserModel, 'password'> {}
