import { IApiResponse, IPaginationResponse, IQuery } from '@/types'
import { IUserInfo, IUserPermission } from '@/types/user.type'
import { http } from '@/utils'

export async function getUsers(
  params: IQuery
): Promise<IApiResponse<IPaginationResponse<IUserInfo>>> {
  const response = await http.get<IApiResponse<IPaginationResponse<IUserInfo>>>('/users', {
    params
  })
  return response.data
}

export async function getUser() {
  const response = await http.get<IApiResponse<IUserInfo>>(`/users/info`)
  return response.data
}

export async function getUserInfoPermission(): Promise<IApiResponse<IUserPermission[]>> {
  const response = await http.get<IApiResponse<IUserPermission[]>>(`/users/info/permissions`)
  return response.data
}
