import { useMemo } from 'react'

import { usePagination, useProductRequisitionByCreator } from '@/hooks'
import { ProductRequisitionActionOptions, useColumnsRequisitionListCreator } from '@/views/product-requisitions/data-table'
import { DataTable } from '@/components/ui'
import { RequisitionType } from '@/constants'

export default function NormalRequisitionByCreatorListTabscontent() {
    const { pagination, handlePageChange, handlePageSizeChange } = usePagination({
        isSearchParams: false
    })

    const { data, isLoading } = useProductRequisitionByCreator({
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
                columns={useColumnsRequisitionListCreator()}
                data={normalRequisitionList || []}
                pages={data?.result?.totalPages || 0}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                actionOptions={ProductRequisitionActionOptions}
            />
        </div>
    )
}
