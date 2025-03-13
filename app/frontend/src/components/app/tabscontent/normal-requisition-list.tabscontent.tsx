import { useMemo } from 'react'
import { useNavigate } from 'react-router'

import { usePagination, useProductRequisitionByApprover } from '@/hooks'
import { IRequisitionFormResponseForApprover } from '@/types'
import { ROUTE } from '@/constants'
import { DataTableFilterOptions, useColumnsRequisitionList } from '@/views/product-requisitions/data-table'
import { DataTable } from '@/components/ui'

export default function NormalRequisitionListTabscontent() {
    const navigate = useNavigate()
    const { pagination, handlePageChange, handlePageSizeChange } = usePagination({
        isSearchParams: false
    })

    const { data, isLoading } = useProductRequisitionByApprover({
        page: pagination.pageIndex,
        pageSize: pagination.pageSize,
        order: 'DESC'
    })

    // get normal requisition list
    const normalRequisitionList = useMemo(() => {
        return data?.result?.items?.filter(
            (item) => item.productRequisitionForm.type === 'normal'
        ) || []
    }, [data?.result?.items])

    const tableData: IRequisitionFormResponseForApprover[] = useMemo(() => {
        return (
            normalRequisitionList.map(
                (item): IRequisitionFormResponseForApprover => ({
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                    approvalUserSlug: item.approvalUserSlug,
                    roleApproval: item.roleApproval,
                    slug: item.productRequisitionForm.slug,
                    productRequisitionForm: item.productRequisitionForm
                })
            ) || []
        )
    }, [normalRequisitionList])

    const handleRowClick = (requisition: IRequisitionFormResponseForApprover) => {
        navigate(`${ROUTE.APPROVAL_PRODUCT_REQUISITIONS}/${requisition.approvalUserSlug}`)
    }

    const columns = useColumnsRequisitionList()

    return (
        <div
            className={`flex w-full flex-col pr-2 transition-all duration-300 ease-in-out`}
        >
            <DataTable
                isLoading={isLoading}
                columns={columns}
                data={tableData}
                pages={data?.result?.totalPages || 0}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                onRowClick={handleRowClick}
                filterOptions={DataTableFilterOptions}
            />
        </div>
    )
}
