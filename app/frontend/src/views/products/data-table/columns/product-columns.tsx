import { ColumnDef } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { MoreHorizontal } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DataTableColumnHeader,
  Button,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui'
import { IProductInfo } from '@/types'
import { DialogUpdateProduct, DialogDeleteProduct } from '@/components/app/dialog'

export const useProductColumns = (): ColumnDef<IProductInfo>[] => {
  const { t } = useTranslation('products')
  const { t: tCommon } = useTranslation(['common'])

  return [
    {
      accessorKey: 'code',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('products.code')} />
    },
    {
      accessorKey: 'name',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('products.name')} />
    },
    {
      accessorKey: 'quantity',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('products.quantity')} />
      )
    },
    {
      accessorKey: 'provider',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('products.provider')} />
      )
    },
    {
      accessorKey: 'unit.name',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('products.unit')} />
    },
    {
      id: tCommon('common.action'),
      cell: ({ row }) => {
        const product = row.original
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
              <DropdownMenuContent className="flex flex-col justify-start" align="end">
                <DropdownMenuLabel>
                  {tCommon('common.action')}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DialogUpdateProduct product={product} />
                <DialogDeleteProduct product={product} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      }
    }
  ]
}
