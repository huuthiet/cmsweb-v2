import { addProductWarehouse, createWarehouse, getWarehouses } from '@/api'
import { IAddProductWarehouse, ICreateWarehouse } from '@/types'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'

export const useWarehouse = () => {
  return useQuery({
    queryKey: ['warehouse'],
    queryFn: async () => getWarehouses(),
    placeholderData: keepPreviousData
  })
}

export const useCreateWarehouse = () => {
  return useMutation({ mutationFn: (data: ICreateWarehouse) => createWarehouse(data) })
}

export const useAddProductWarehouse = () => {
  return useMutation({ mutationFn: (data: IAddProductWarehouse) => addProductWarehouse(data) })
}
