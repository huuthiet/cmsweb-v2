import { TriangleAlert } from 'lucide-react'

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

import { IProductRequisitionInfo } from '@/types'
import { useRequisitionStore } from '@/stores'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

export function DialogDeleteProductInRequisition({
  product
}: {
  product: IProductRequisitionInfo | null
}) {
  const { t } = useTranslation('productRequisition')
  const { t: tCommon } = useTranslation('common')
  const { deleteProductToRequisition } = useRequisitionStore()
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (data: IProductRequisitionInfo) => {
    deleteProductToRequisition(data)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex justify-start w-full" asChild>
        <DialogTrigger asChild>
          <Button variant="ghost" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
            {t('productRequisition.deleteProduct')}
          </Button>
        </DialogTrigger>
      </DialogTrigger>

      <DialogContent className="max-w-[22rem] rounded-md sm:max-w-[32rem] font-beVietNam">
        <DialogHeader>
          <DialogTitle className="pb-4 border-b border-destructive text-destructive">
            <div className="flex items-center gap-2">
              <TriangleAlert className="w-6 h-6" />
              {t('productRequisition.deleteProduct')}
            </div>
          </DialogTitle>
          <DialogDescription className="p-2 bg-red-100 rounded-md text-destructive">
            {tCommon('common.warning')}
          </DialogDescription>

          <div className="py-4 text-sm text-gray-500">
            {t('productRequisition.deleteProductInRequisitionWarning1')}{' '}
            <span className="font-bold">{product?.product.name}</span>.
            <br />
            <br />
            {t('productRequisition.deleteProductInRequisitionConfirmation')}
          </div>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-center gap-2">
          <Button variant="outline" onClick={() => setIsOpen}>
            {t('productRequisition.cancel')}
          </Button>
          <Button variant="destructive" onClick={() => product && handleSubmit(product)}>
            {t('productRequisition.confirmDelete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
