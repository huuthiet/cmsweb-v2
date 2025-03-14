import { ColumnDef } from '@tanstack/react-table'

import {
  Button,
  DataTableColumnHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui'
import { ISite } from '@/types'
import { MoreHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { DialogUpdateSite } from '@/components/app/dialog'
import { DialogDeleteSite } from '@/components/app/dialog'

export const useSiteColumns = (): ColumnDef<ISite>[] => {
  const { t } = useTranslation(['sites'])
  const { t: tCommon } = useTranslation(['common'])
  return [
    {
      accessorKey: 'slug',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('sites.slug')} />
    },
    {
      accessorKey: 'name',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('sites.name')} />
    },
    {
      accessorKey: 'company.name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('sites.companyName')} />
      )
    },
    {
      accessorKey: 'company.slug',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('sites.companySlug')} />
      )
    },
    {
      id: 'actions',
      header: tCommon('common.action'),
      cell: ({ row }) => {
        const site = row.original
        return (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-8 h-8 p-0">
                  <span className="sr-only">
                    {tCommon('common.action')}
                  </span>
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {tCommon('common.action')}
                </DropdownMenuLabel>
                <DialogUpdateSite site={site} />
                <DialogDeleteSite site={site} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      }
    }
  ]
}
