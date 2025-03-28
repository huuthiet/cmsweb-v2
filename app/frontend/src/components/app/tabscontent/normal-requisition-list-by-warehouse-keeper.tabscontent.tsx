import { useMemo } from 'react'

import { useGetApprovedProductRequisition, usePagination } from '@/hooks'
import { ProductRequisitionActionOptions } from '@/views/product-requisitions/data-table'
import { DataTable } from '@/components/ui'
import { RequisitionType } from '@/constants'
import { useWarehouseColumns } from '@/views/warehouse/DataTable/columns'

export default function NormalRequisitionByWarehouseKeeperListTabscontent() {
    const { pagination, handlePageChange, handlePageSizeChange } = usePagination({
        isSearchParams: false
    })

    const { data, isLoading } = useGetApprovedProductRequisition({
        page: pagination.pageIndex,
        pageSize: pagination.pageSize,
        order: 'DESC'
    })

    // get normal requisition list
    const normalRequisitionList = useMemo(() => {
        return data?.result?.items?.filter(
            (item) => item.type === RequisitionType.NORMAL
        ) || []
    }, [data?.result?.items])

    return (
        <div
            className={`flex w-full flex-col pr-2 transition-all duration-300 ease-in-out`}
        >
            <DataTable
                isLoading={isLoading}
                columns={useWarehouseColumns()}
                data={normalRequisitionList || []}
                pages={data?.result?.totalPages || 0}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                actionOptions={ProductRequisitionActionOptions}
            />
        </div>
    )
}
