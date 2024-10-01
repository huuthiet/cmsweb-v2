import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReaderIcon } from '@radix-ui/react-icons'

import { DataTable, Label } from '@/components/ui'
import { usePagination, useRoles } from '@/hooks'
import { useRoleColumns } from './DataTable/columns'
import { CustomComponent } from './DataTable/CustomComponent'

const Roles: React.FC = () => {
  const { t } = useTranslation(['roles'])
  const { pagination } = usePagination()

  const { data: roles } = useRoles({})

  return (
    <div className="flex flex-col gap-4">
      <Label className="flex items-center gap-1 font-semibold text-normal text-md font-beVietNam">
        <ReaderIcon className="header-icon" />
        {t('roles.list')}
      </Label>
      <DataTable
        columns={useRoleColumns()}
        data={roles || []}
        pages={0}
        page={pagination.pageIndex + 1}
        pageSize={pagination.pageSize}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
        CustomComponent={CustomComponent}
        isLoading={false}
      />
    </div>
  )
}

export default Roles