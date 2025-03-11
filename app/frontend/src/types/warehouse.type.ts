import { IBase } from './base.type'
import { IProductInfo } from './product.type'

export interface IWarehouse extends IBase {
  name: string
  address: string
  description: string
  productWarehouse: IProductWarehouse[]
}

export interface ICreateWarehouse {
  name: string
  address: string
  description: string
}

export interface IProductWarehouse extends IBase {
  product: IProductInfo
  quantity: number
}

export interface IAddProductWarehouse {
  quantity: number
  warehouse: string // slug of warehouse
  product: string // slug of product
}
