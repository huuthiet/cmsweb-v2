import { useState } from 'react'
import { AxiosError, isAxiosError } from 'axios'
import { useTranslation } from 'react-i18next'
import { Trash2, TriangleAlert } from 'lucide-react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui'

import { IApiResponse, IProductRequisitionFormInfo } from '@/types'

import { useDeleteProductRequisition, usePagination } from '@/hooks'
import { showErrorToast, showToast } from '@/utils'
import { useQueryClient } from '@tanstack/react-query'

export default function DialogDeleteProductRequisition({
  requisition // IRequisitionByUserApproval
}: {
  requisition: IProductRequisitionFormInfo | null
}) {
  const queryClient = useQueryClient()
  const { t } = useTranslation('productRequisition')
  const { t: tToast } = useTranslation('toast')
  const { pagination } = usePagination()
  const { mutate: deleteProductRequisition } = useDeleteProductRequisition()
  const [isOpen, setIsOpen] = useState(false)
  const refetchParams = {
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    order: 'DESC'
  }

  const handleSubmit = (formSlug: string) => {
    deleteProductRequisition(formSlug, {
      onSuccess: () => {
        setIsOpen(false)
        queryClient.invalidateQueries({
          queryKey: ['productRequisitionByCreator', refetchParams],
        })
        showToast(tToast('toast.deleteProductRequisitionSuccess'))
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError<IApiResponse<void>>
          if (axiosError.response?.data.code) showErrorToast(axiosError.response.data.code)
        }
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex justify-start w-full" asChild>
        <DialogTrigger asChild>
          <Button variant="destructive" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
            <Trash2 className="icon" />
            {t('productRequisition.deleteProductRequisition')}
          </Button>
        </DialogTrigger>
      </DialogTrigger>

      <DialogContent className="max-w-[22rem] rounded-md sm:max-w-[32rem] font-beVietNam">
        <DialogHeader>
          <DialogTitle className="pb-4 border-b border-destructive text-destructive">
            <div className="flex items-center gap-2">
              <TriangleAlert className="w-6 h-6" />
              {t('productRequisition.deleteProductRequisition')}
            </div>
          </DialogTitle>
          <DialogDescription className="p-2 bg-red-100 rounded-md text-destructive">
            {t('productRequisition.deleteProductRequisitionDescription')}
          </DialogDescription>

          <div className="py-4 text-sm text-gray-500">
            {t('productRequisition.deleteProductRequisitionConfirmation')}
          </div>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-center gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {t('productRequisition.cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={() =>
              requisition && handleSubmit(requisition.slug || '')
            }
          >
            {t('productRequisition.confirmDelete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
