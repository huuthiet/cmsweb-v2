import { useTranslation } from 'react-i18next'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui'

import { RequisitionDetailForm } from '@/components/app/form'
import { IRequestRequisitionInfo } from '@/types'

interface DialogRequisitionDetailProps {
  openDialog: boolean
  requisition?: IRequestRequisitionInfo | null
  component: React.ReactNode
  onOpenChange: () => void
}

export function DialogRequisitionDetail({
  openDialog,
  requisition,
  component,
  onOpenChange
}: DialogRequisitionDetailProps) {
  const { t } = useTranslation('productRequisition')

  return (
    <Dialog open={openDialog} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{component}</DialogTrigger>
      <DialogContent className="max-w-[64rem]">
        <DialogHeader>
          <DialogTitle>{t('requisitionDetail.requestDetail')}</DialogTitle>
          <DialogDescription>{t('requisitionDetail.requestDetailDescription')}</DialogDescription>
        </DialogHeader>
        <RequisitionDetailForm data={requisition || undefined} />
      </DialogContent>
    </Dialog>
  )
}