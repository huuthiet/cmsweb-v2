import { useGetApprovedProductRequisition, usePagination } from '@/hooks'
import { ProductRequisitionActionOptions } from '@/views/product-requisitions/data-table'
import { DataTable } from '@/components/ui'
import { RequisitionType } from '@/constants'
import { useWarehouseColumns } from '@/views/warehouse/DataTable/columns'

export default function UrgentRequisitionByWarehouseKeeperListTabscontent() {
    const { pagination, handlePageChange, handlePageSizeChange } = usePagination({
        isSearchParams: false
    })

    const { data, isLoading } = useGetApprovedProductRequisition({
        page: pagination.pageIndex,
        pageSize: pagination.pageSize,
        order: 'DESC',
        type: RequisitionType.URGENT
    })

    const urgentRequisitionList = data?.result?.items || []

    return (
        <div
            className={`flex flex-col pr-2 w-full transition-all duration-300 ease-in-out`}
        >
            <DataTable
                isLoading={isLoading}
                columns={useWarehouseColumns()}
                data={urgentRequisitionList || []}
                pages={data?.result?.totalPages || 0}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                actionOptions={ProductRequisitionActionOptions}
            />
        </div>
    )
}
