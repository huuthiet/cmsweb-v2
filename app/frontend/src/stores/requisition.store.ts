import { create } from 'zustand'
import toast from 'react-hot-toast'
import { persist } from 'zustand/middleware'

import { IProductRequisitionFormCreate, IProductRequisitionInfo, IRequisitionStore } from '@/types'
import { showToast, showErrorToast } from '@/utils'
import { RequisitionType, UserApprovalStage } from '@/constants'

export const useRequisitionStore = create<IRequisitionStore>()(
  persist(
    (set, get) => ({
      requisition: undefined,
      getRequisition: () => get().requisition,
      setRequisition: (requisition: IProductRequisitionFormCreate) => {
        set((state) => ({
          requisition: {
            ...requisition,
            requestProducts: state.requisition?.requestProducts ?? []
          }
        }))
        showToast('Tạo phiếu yêu cầu thành công!')
      },
      updateRequisition: (updatedFields: Partial<IProductRequisitionFormCreate>) => {
        set((state) => ({
          requisition: state.requisition
            ? {
                ...state.requisition,
                ...updatedFields,
                requestProducts: state.requisition.requestProducts
              }
            : undefined
        }))
      },
      clearRequisition: () => set({ requisition: undefined }),
      addProductToRequisition: (product: IProductRequisitionInfo) => {
        const currentRequisition = get().requisition
        console.log('product', product)
        if (currentRequisition) {
          const productExists = currentRequisition.requestProducts.some(
            (p) => p.product.slug === product.product.slug
          )
          if (productExists) {
            showErrorToast(1000)
          } else {
            set({
              requisition: {
                ...currentRequisition,
                requestProducts: [
                  ...currentRequisition.requestProducts,
                  {
                    ...product
                    // product: product.product,
                    // name: product.product.name, // Corrected assignment
                    // provider: product.product.provider,
                    // unit: { slug: product.product.unit.slug, name: product.product.unit.name },
                    // description: product.product.description
                  }
                ]
              }
            })
            toast.success('Đã thêm vật tư vào phiếu yêu cầu!')
          }
        }
      },
      updateProductToRequisition: (product: IProductRequisitionInfo) => {
        const currentRequisition = get().requisition
        if (currentRequisition) {
          const productIndex = currentRequisition.requestProducts.findIndex(
            (p) => p.product.slug === product.product.slug
          )
          if (productIndex === -1) {
            showErrorToast(1000)
          } else {
            const updatedProducts = [...currentRequisition.requestProducts]
            updatedProducts[productIndex] = product
            set({ requisition: { ...currentRequisition, requestProducts: updatedProducts } })
            showToast('Đã cập nhật vật tư trong phiếu yêu cầu!')
          }
        }
      },
      deleteProductToRequisition: (product: IProductRequisitionInfo) => {
        const currentRequisition = get().requisition
        if (currentRequisition) {
          const updatedProducts = currentRequisition.requestProducts.filter(
            (p) => p.product.slug !== product.product.slug
          )
          set({ requisition: { ...currentRequisition, requestProducts: updatedProducts } })
          showToast('Đã xóa vật tư trong phiếu yêu cầu!')
        }
      }
    }),
    {
      name: 'requisition-storage'
    }
  )
)
