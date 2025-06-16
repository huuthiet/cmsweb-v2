import { useMemo } from 'react'

import { usePagination, useProductRequisitionByCreator } from '@/hooks'
import { ProductRequisitionActionOptions, useColumnsRequisitionListCreator } from '@/views/product-requisitions/data-table'
import { DataTable } from '@/components/ui'
import { RequisitionType } from '@/constants'

export default function UrgentRequisitionByCreatorListTabscontent() {
    const { pagination, handlePageChange, handlePageSizeChange } = usePagination({
        isSearchParams: false
    })

    const { data, isLoading } = useProductRequisitionByCreator({
        page: pagination.pageIndex,
        pageSize: pagination.pageSize,
        order: 'DESC',
        type: RequisitionType.URGENT
    })

    // get urgent requisition list
    const urgentRequisitionList = useMemo(() => {
        return data?.result?.items?.filter(
            (item) => item.type === RequisitionType.URGENT
        ) || []
    }, [data?.result?.items])

    return (
        <div
            className={`flex flex-col pr-2 w-full transition-all duration-300 ease-in-out`}
        >
            <DataTable
                isLoading={isLoading}
                columns={useColumnsRequisitionListCreator()}
                data={urgentRequisitionList || []}
                pages={data?.result?.totalPages || 0}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                actionOptions={ProductRequisitionActionOptions}
            />
        </div>
    )
}
