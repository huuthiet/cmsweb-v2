import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReaderIcon } from '@radix-ui/react-icons'

import { Label } from '@/components/ui'
import { RequisitionByCreatorListTabs } from '@/components/app/tab'

const ProductRequisitions: React.FC = () => {
  const { t } = useTranslation(['productRequisition'])


  return (
    <div className="flex flex-col gap-4">
      <Label className="flex items-center gap-1 font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        {t('productRequisition.listEmployee')}
      </Label>
      <RequisitionByCreatorListTabs />
    </div>
  )
}

export default ProductRequisitions
