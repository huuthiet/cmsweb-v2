// import React, { useState } from 'react'
// import { useTranslation } from 'react-i18next'

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
// import { ICreateSite, ICreateWarehouse } from '@/types'
// import { useCreateSite } from '@/hooks'
// import { CreateSiteForm } from '@/components/app/form'
// import { showToast } from '@/utils'
// import { DialogConfirmCreateSite } from '@/components/app/dialog/dialog-confirm-create-site'
// import { useCreateWarehouse } from '@/hooks/use-warehouse'

// const CreateWarehouse: React.FC = () => {
//   const { t } = useTranslation(['warehouse'])
//   const { t: tToast } = useTranslation(['toast'])
//   const { mutate: createWarehouse } = useCreateWarehouse()
//   const [openDialog, setOpenDialog] = useState(false)
//   const [site, setSite] = useState<ICreateSite | null>(null)

//   const handleConfirmCreateWarehouse = (values: ICreateWarehouse) => {
//     createWarehouse(values, {
//       onSuccess: () => {
//         showToast(tToast('toast.createWarehouseSuccessfully'))
//       }
//     })
//   }

//   const onSubmit = (values: ICreateSite) => {
//     setSite(values)
//     setOpenDialog(true)
//   }

//   return (
//     <div className="flex flex-col gap-4 mt-2">
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between w-full border-b">
//           <div className="flex flex-col items-start gap-2 py-2">
//             <CardTitle>{t('sites.createSite')}</CardTitle>
//             <CardDescription>{t('sites.createSiteDescription')}</CardDescription>
//           </div>
//         </CardHeader>
//         <CardContent className="flex flex-col">
//           <CreateSiteForm onSubmitCreateSite={onSubmit} />
//         </CardContent>
//       </Card>
//       <DialogConfirmCreateSite
//         handleCreateSite={handleConfirmCreateWarehouse}
//         openDialog={openDialog}
//         site={site}
//         onOpenChange={() => setOpenDialog(!openDialog)}
//       />
//     </div>
//   )
// }

// export default CreateWarehouse
