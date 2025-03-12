import { useTranslation } from 'react-i18next'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { NormalRequisitionListTabscontent, UrgentRequisitionListTabscontent } from '../tabscontent'

export default function RequisitionListTabs() {
    const { t } = useTranslation(['productRequisition'])
    return (
        <Tabs defaultValue="normal">
            <TabsList className="grid grid-cols-2 gap-3 mb-10 sm:grid-cols-6 lg:mb-0">
                <TabsTrigger value="normal" className="flex justify-center">
                    {t('productRequisition.normal')}
                </TabsTrigger>
                <TabsTrigger value="urgent" className="flex justify-center">
                    {t('productRequisition.urgent')}
                </TabsTrigger>
            </TabsList>
            <TabsContent value="normal" className="w-full p-0">
                <NormalRequisitionListTabscontent />
            </TabsContent>
            <TabsContent value="urgent" className="p-0">
                <UrgentRequisitionListTabscontent />
            </TabsContent>
        </Tabs>
    )
}
