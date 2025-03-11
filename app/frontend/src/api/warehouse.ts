import { IAddProductWarehouse, IApiResponse, ICreateWarehouse, IWarehouse } from '@/types'
import { http } from '@/utils'

export async function getWarehouses(): Promise<IApiResponse<IWarehouse[]>> {
  const response = await http.get<IApiResponse<IWarehouse[]>>('/warehouses')
  return response.data
}

export async function createWarehouse(data: ICreateWarehouse): Promise<IApiResponse<IWarehouse>> {
  const response = await http.post<IApiResponse<IWarehouse>>('/warehouses', data)
  return response.data
}

export async function getAllProductWarehouse(): Promise<IApiResponse<IWarehouse>> {
  const response = await http.get<IApiResponse<IWarehouse>>(`/productWarehouses`)
  return response.data
}

export async function addProductWarehouse(
  data: IAddProductWarehouse
): Promise<IApiResponse<IWarehouse>> {
  const response = await http.post<IApiResponse<IWarehouse>>(`/productWarehouses`, data)
  return response.data
}
