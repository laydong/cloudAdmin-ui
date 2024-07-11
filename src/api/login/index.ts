import request from '@/axios'
import type { LoginUser, LoginResponse, UserResponse } from './types'

interface RoleParams {
  roleName: string
}

export const loginApi = (data: LoginUser): Promise<IResponse<LoginResponse>> => {
  return request.post({ url: '/login', data })
}
export const getAdminApi = (): Promise<IResponse<UserResponse>> => {
  return request.get({ url: '/user/info' })
}
export const loginOutApi = (): Promise<IResponse> => {
  return request.get({ url: '/loginOut' })
}

export const getUserListApi = ({ params }: AxiosConfig) => {
  return request.get<{
    code: string
    data: {
      list: LoginUser[]
      total: number
    }
  }>({ url: '/mock/user/list', params })
}

export const getAdminRoleApi = (
  params: RoleParams
): Promise<IResponse<AppCustomRouteRecordRaw[]>> => {
  return request.get({ url: '/mock/role/list', params })
}

export const getTestRoleApi = (params: RoleParams): Promise<IResponse<string[]>> => {
  return request.get({ url: '/mock/role/list2', params })
}
