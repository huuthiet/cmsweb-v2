import {
  MappingProfile,
  Mapper,
  createMap,
  forMember,
  extend,
  mapWith,
} from "@automapper/core";
import { 
  ProductWarehouseResponseDto,
  WarehouseResponseDto,
  ProductResponseDto
} from "@dto/response";
import { CreateProductWarehouseRequestDto } from "@dto/request";
import { ProductWarehouse, Warehouse, Product } from "@entities";
import { baseMapper } from "./base.mapper";

// Define the mapping profile
export const productWarehouseMapper: MappingProfile = (mapper: Mapper) => {
  // Map entity to response object
  createMap(
    mapper,
    ProductWarehouse,
    ProductWarehouseResponseDto,
    forMember(
      (destination) => destination.warehouse,
      mapWith(
        WarehouseResponseDto,
        Warehouse,
        (source) => source.warehouse)
    ),
    forMember(
      (destination) => destination.product,
      mapWith(
        ProductResponseDto,
        Product,
        (source) => source.product)
    ),
    extend(baseMapper(mapper))
  );

  // Map request object to entity
  createMap(mapper, CreateProductWarehouseRequestDto, ProductWarehouse);
};