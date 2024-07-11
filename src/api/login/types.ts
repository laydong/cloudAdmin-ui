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

export interface LoginResponse {
  token: string
  expire_time: number
}

export interface UserResponse {
  id: number
  user_name: string
  nickname: string
  avatar: string
}
