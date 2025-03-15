import { ColumnDef } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'

import {
  DataTableColumnHeader,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui'
import { IProductInfo } from '@/types'
import { DialogAddProductRequest } from '@/components/app/dialog'

export const useColumnsSearchProduct = (): ColumnDef<IProductInfo>[] => {
  const { t } = useTranslation('productRequisition')
  const { t: tProduct } = useTranslation('products')

  return [
    {
      accessorKey: 'addRequest',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('productRequisition.addProduct')} />
      ),
      cell: ({ row }) => {
        const product = row.original
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex justify-center w-full">
                  <DialogAddProductRequest product={product} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('productRequisition.addProduct')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      }
    },
    {
      accessorKey: 'code',
      header: ({ column }) => <DataTableColumnHeader column={column} title={tProduct('products.code')} />
    },
    {
      accessorKey: 'name',
      header: ({ column }) => <DataTableColumnHeader column={column} title={tProduct('products.name')} />
    },

    {
      accessorKey: 'quantity',
      header: ({ column }) => <DataTableColumnHeader column={column} title={tProduct('products.quantity')} />
    },
    {
      accessorKey: 'unit',
      header: ({ column }) => <DataTableColumnHeader column={column} title={tProduct('products.unit')} />,
      cell: ({ row }) => {
        const unit = row.original.unit
        return <span>{unit.name}</span>
      }
    },
    {
      accessorKey: 'description',
      header: ({ column }) => <DataTableColumnHeader column={column} title={tProduct('products.description')} />
    },
    {
      accessorKey: 'provider',
      header: ({ column }) => <DataTableColumnHeader column={column} title={tProduct('products.provider')} />
    }
  ]
}
