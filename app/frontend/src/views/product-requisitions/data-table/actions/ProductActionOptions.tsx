import { useState } from 'react'

import { DialogAddProductRequest } from '@/components/app/dialog'
import { IProductInfo } from '@/types'

export default function ProductActionOptions() {
  const [product,] = useState<IProductInfo | null>(null)

  return (
    <>
      <DialogAddProductRequest product={product} />
    </>
  )
}
