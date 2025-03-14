import { ColumnDef } from '@tanstack/react-table'
import i18next from 'i18next'
import { MoreHorizontal } from 'lucide-react'

import {
  Button,
  DataTableColumnHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui'
import { IRequestProductInfoUpdate } from '@/types'
import {
  DialogDeleteProductInRequisitionUpdate,
  DialogUpdateProductRequisition
} from '@/components/app/dialog'
import { useTranslation } from 'react-i18next'

export const useColumnsUpdateRequisition = ()
  // handleEditProduct: (product: IUpdateProductRequisitionQuantity) => void,
  // handleDeleteProduct: (requestProductSlug: string) => void
  : ColumnDef<IRequestProductInfoUpdate>[] => {
  const { t: tCommon } = useTranslation(['common'])

  return [
    {
      accessorKey: 'code',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.productCode')} />
      ),
      accessorFn: (row) => row.product?.code ?? row.temporaryProduct?.code ?? ''
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.productName')} />
      ),
      accessorFn: (row) => row.product?.name ?? row.temporaryProduct?.name ?? ''
    },
    {
      accessorKey: 'provider',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.provider')} />
      ),
      accessorFn: (row) => row.product?.provider ?? row.temporaryProduct?.provider ?? ''
    },
    {
      accessorKey: 'unit',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.unit')} />
      ),
      accessorFn: (row) => row.product?.unit?.name ?? row.temporaryProduct?.unit?.name ?? ''
    },
    {
      accessorKey: 'requestQuantity',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={i18next.t('tableData.quantity')} />
      )
    },
    {
      accessorKey: 'actions',
      header: tCommon('common.action'),
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
              <DropdownMenuContent align="end" className="flex flex-col justify-start w-full">
                <DropdownMenuLabel>
                  {tCommon('common.action')}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DialogUpdateProductRequisition
                  // handleEditProduct={handleConfirmEditProduct}
                  // isExistProduct={isExistProduct}
                  // openDialog={openEdit}
                  product={product as IRequestProductInfoUpdate}
                // component={null}
                // onOpenChange={onOpenEditChange}
                />
                <DialogDeleteProductInRequisitionUpdate
                  // handleDeleteProduct={handleConfirmDeleteProduct}
                  // openDialog={openDelete}
                  product={product as IRequestProductInfoUpdate}
                // component={null}
                // onOpenChange={onOpenDeleteChange}
                />
                {/* <DropdownMenuItem onClick={() => handleDelete(rowData)}>
                  Xóa vật tư
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      }
    }
  ]
}
