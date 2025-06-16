import { useTranslation } from 'react-i18next'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { NormalRequisitionByWarehouseKeeperListTabscontent, UrgentRequisitionByWarehouseKeeperListTabscontent } from '../tabscontent'
import { RequisitionType } from '@/constants'

export default function RequisitionByWarehouseKeeperListTabs() {
    const { t } = useTranslation(['warehouse'])
    return (
        <Tabs defaultValue="normal">
            <TabsList className="grid grid-cols-2 gap-3 mb-10 sm:grid-cols-6 lg:mb-0">
                <TabsTrigger value="normal" className="flex justify-center">
                    {t('warehouse.normal')}
                </TabsTrigger>
                <TabsTrigger value="urgent" className="flex justify-center">
                    {t('warehouse.urgent')}
                </TabsTrigger>
            </TabsList>
            <TabsContent value="normal" className="p-0 w-full">
                <NormalRequisitionByWarehouseKeeperListTabscontent />
            </TabsContent>
            <TabsContent value="urgent" className="p-0">
                <UrgentRequisitionByWarehouseKeeperListTabscontent />
            </TabsContent>
        </Tabs>
    )
}
