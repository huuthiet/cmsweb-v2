import React from 'react'
import { useTranslation } from 'react-i18next'

import { Label } from '@/components/ui'
import { ReaderIcon } from '@radix-ui/react-icons'
import { RequisitionByWarehouseKeeperListTabs } from '@/components/app/tab'

const Warehouse: React.FC = () => {
  const { t } = useTranslation(['warehouse'])

  return (
    <div className="flex flex-col gap-4 mt-2">
      <Label className="flex items-center gap-1 font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        {t('warehouse.approvedRequisitionList')}
      </Label>
      <RequisitionByWarehouseKeeperListTabs />
    </div>
  )
}

export default Warehouse
