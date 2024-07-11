export interface UserLoginType {
  username: string
  password: string
}

export interface LoginUser {
  username: string
  password: string
  captcha_id: string
  captcha: string
}
