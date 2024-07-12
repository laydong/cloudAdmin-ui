import request from '@/axios'
import {UserListRequest, UserType} from "@/api/user/types";

export const getAdminListApi = (data: UserListRequest): Promise<IResponse<UserType[]>> => {
  return request.get({ url: '/user/list', data })
}

export const getAdminApi = (): Promise<IResponse<UserType>> => {
  return request.get({ url: '/user/info' })
}
