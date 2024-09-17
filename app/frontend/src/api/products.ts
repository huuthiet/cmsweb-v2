import {
  IPaginationResponse,
  IProductApprovalInfo,
  IProductInfo,
  IProductRequirementInfoCreate
} from '@/types'
import productData from '@/data/products'
import productListData from '@/data/product.list'

export async function getProducts(params: {
  page: number
  pageSize: number
}): Promise<IPaginationResponse<IProductApprovalInfo>> {
  try {
    const users: IProductApprovalInfo[] = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(productData.items)
      }, 1000)
    })

    const startIndex = (params.page - 1) * params.pageSize
    const endIndex = startIndex + params.pageSize

    const paginatedProducts = users.slice(startIndex, endIndex)

    const total = users.length
    const pages = Math.ceil(total / params.pageSize)

    return {
      items: paginatedProducts,
      total,
      page: params.page,
      pageSize: params.pageSize,
      pages
    }
  } catch (error) {
    console.log('Failed to fetch products:', error)
    throw new Error('Failed to fetch products')
  }
}

export async function getProductList(params: {
  page: number
  pageSize: number
}): Promise<IPaginationResponse<IProductInfo>> {
  try {
    const productList: IProductInfo[] = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(productListData.items)
      }, 1000)
    })

    const startIndex = (params.page - 1) * params.pageSize
    const endIndex = startIndex + params.pageSize

    const paginatedProductList = productList.slice(startIndex, endIndex)

    const total = productList.length
    const pages = Math.ceil(total / params.pageSize)

    return {
      items: paginatedProductList,
      total,
      page: params.page,
      pageSize: params.pageSize,
      pages
    }
  } catch (error) {
    console.log('Failed to fetch products:', error)
    throw new Error('Failed to fetch products')
  }
}

export async function postProductRequest(params: {
  requestCode: string
  requester: string
  project: string
  construction: string
  approver: string
  note: string
  priority: string
  products: IProductInfo[]
}): Promise<IProductRequirementInfoCreate> {
  // Convert parameters to lowercase directly
  const lowercaseParams = {
    requestCode: params.requestCode,
    requester: params.requester.toLowerCase(),
    project: params.project.toLowerCase(),
    construction: params.construction.toLowerCase(),
    approver: params.approver.toLowerCase(),
    note: params.note.toLowerCase(),
    priority: params.priority.toLowerCase(),
    products: params.products
  }
  console.log('lowercaseParams', lowercaseParams)
  return lowercaseParams
}

// export async function searchProduct(params: {
//   productName: string
// }): Promise<IProductInfoSearch[]> {
//   const { productName } = params
//   const products = productList.items.filter((product) =>
//     product.productName.toLowerCase().includes(productName.toLowerCase())
//   )
//   return products
// }

// export async function searchProduct(params: {
//   productName: string
// }): Promise<IProductInfoSearch[]> {
//   const { productName } = params
//   const products = productList.items.filter((product) =>
//     product.productName.toLowerCase().includes(productName.toLowerCase())
//   )
//   return products
// }