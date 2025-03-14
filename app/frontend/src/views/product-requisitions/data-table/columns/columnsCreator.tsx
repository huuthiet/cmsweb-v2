import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Button,
  DataTableColumnHeader
} from '@/components/ui'
import { IProductRequisitionFormInfo, ProductRequisitionStatus } from '@/types'
import { ProductRequisitionByCreatorStatusBadge } from '@/components/app/badge'
import { RequisitionTypeBadge } from '@/components/app/badge'
import { DialogDeleteProductRequisition, DialogRequisitionDetail } from '@/components/app/dialog'
import { RecalledStatusBadge } from '@/components/app/badge'
import { Authority, FormApprovalType, ROUTE } from '@/constants'
import { useTranslation } from 'react-i18next'
import { useUserInfoPermissionsStore } from '@/stores'

export const useColumnsRequisitionListCreator = (): ColumnDef<IProductRequisitionFormInfo>[] => {
  const navigate = useNavigate()
  const { t } = useTranslation('productRequisition')
  const { t: tCommon } = useTranslation('common')
  const { userRoles } = useUserInfoPermissionsStore()
  const handleEditRequisition = (requisition: IProductRequisitionFormInfo) => {
    navigate(ROUTE.EDIT_PRODUCT_REQUISITIONS.replace(':slug', requisition.slug))
  }

  return [
    {
      accessorKey: 'code',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('productRequisition.requestCode')} />,
      cell: ({ row }) => row.original.code || 'N/A'
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('productRequisition.createdAt')} />,
      cell: ({ row }) => {
        const date = row.original.createdAt ? new Date(row.original.createdAt) : null
        return date ? format(date, 'HH:mm dd/MM/yyyy') : 'N/A'
      }
    },
    {
      accessorKey: 'PO',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('productRequisition.PO')} />,
      cell: ({ row }) => {
        const PO = row.original?.PO ? row.original.PO : null
        return PO ? PO : 'N/A'
      }
    },
    {
      accessorKey: 'deadlineApproval',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('productRequisition.deadlineApproval')} />,
      cell: ({ row }) => {
        const date = row.original.deadlineApproval ? new Date(row.original.deadlineApproval) : null
        return date ? format(date, 'HH:mm dd/MM/yyyy') : 'N/A'
      }
    },
    {
      accessorKey: 'productRequisitionForm',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('productRequisition.requisitionType')} />,
      cell: ({ row }) => {
        const { type } = row.original
        return type ? <RequisitionTypeBadge type={type} /> : 'N/A'
      }
    },
    {
      accessorKey: 'creator.fullname',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('productRequisition.requester')} />,
      cell: ({ row }) => row.original.creator?.fullname || 'N/A'
    },
    {
      id: 'company',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('productRequisition.companyName')} />,
      cell: ({ row }) => {
        const { creator } = row.original
        const companyName = creator?.userDepartments?.[0]?.department?.site?.company?.name
        return <div className="min-w-[12rem] text-[0.8rem]">{companyName || ''}</div>
      }
    },
    {
      accessorKey: 'isRecalled',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('productRequisition.returnStatus')} />,
      cell: ({ row }) => {
        const { status, isRecalled } = row.original
        return (
          <div className="min-w-[8rem]">
            <RecalledStatusBadge status={status} isRecalled={isRecalled} />
          </div>
        )
      }
    },
    {
      accessorFn: (row) => row.status,
      id: 'status',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('productRequisition.status')} />,
      cell: ({ row }) => {
        return (
          <ProductRequisitionByCreatorStatusBadge
            isRecalled={row.original.isRecalled}
            status={row.original.status as ProductRequisitionStatus}
          />
        )
      },
      filterFn: (row, id, value) => {
        return row.original.status === value
      }
    },
    {
      id: 'actions',
      header: () => <div className="text-[0.8rem] min-w-[4rem]">
        {tCommon('common.action')}
      </div>,
      cell: ({ row }) => {
        const requisition = row.original
        const canEdit =
          (requisition.status === 'waiting' && !requisition.isRecalled) ||
          (requisition.status === 'cancel' && requisition.isRecalled) ||
          (requisition.status === 'cancel' && !requisition.isRecalled)

        return (
          <>
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
                <DropdownMenuSeparator />
                <DialogRequisitionDetail requisition={requisition} />
                {canEdit && (
                  <DropdownMenuItem onClick={() => handleEditRequisition(requisition)}>
                    {t('productRequisition.requestEdit')}
                  </DropdownMenuItem>
                )}
                {userRoles?.some(role =>
                  role.permissions?.some(permission =>
                    permission.authority === Authority.DELETE && permission.resource === FormApprovalType.PRODUCT_REQUISITION_FORM
                  )
                ) && <DialogDeleteProductRequisition requisition={requisition} />}

              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )
      }
    }
  ]
}
