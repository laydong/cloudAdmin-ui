export interface UserType {
  id: number //id
  username: string //账号
  nickname: string //昵称
  avatar: string // 头像
  email: string //邮箱
  mobile: string // 手机号
  sex: number //性别 1男 2女 0保密
  score: number //积分
  status: number //状态 1正常2禁用
  login_ip: string //登录IP
  describe: string //签名
  login_time: string //登录时间
  created_at: string //创建时间
  updated_at: string //更新时间
}


export interface UserListRequest {
  id: number //id
  username: string //账号
  nickname: string //昵称
  email: string //邮箱
  mobile: string // 手机号
  sex: number //性别 1男 2女 0保密
  status: number //状态 1正常2禁用
  currentPage: number
  pageSize: number
}
