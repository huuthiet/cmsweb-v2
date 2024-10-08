import * as z from 'zod'

export const productRequisitionSchema = z.object({
  code: z.string().min(1, 'Mã yêu cầu không hợp lệ'),
  requester: z.string().min(1, 'Tên người yêu cầu không hợp lệ'),
  deadlineApproval: z
    .string()
    .min(1, 'Ngày hết hạn không hợp lệ')
    .refine((date) => new Date(date) > new Date(), {
      message: 'Ngày hết hạn phải là thời điểm trong tương lai'
    }),
  company: z.object({
    slug: z.string().min(1, 'Mã công ty không hợp lệ'),
    name: z.string().min(1, 'Tên công ty không hợp lệ'),
    logo: z.string().min(1, 'Logo công ty không hợp lệ')
  }),
  site: z.object({
    slug: z.string().min(1, 'Mã công trình không hợp lệ'),
    name: z.string().min(1, 'Tên công trình không hợp lệ')
  }),
  project: z.object({
    slug: z.string().min(1, 'Mã dự án không hợp lệ'),
    name: z.string().min(1, 'Tên dự án không hợp lệ')
  }),
  type: z.enum(['normal', 'urgent']),
  requestProducts: z.array(
    z.object({
      isExistProduct: z.boolean(),
      slug: z.string().min(1, 'Mã sản phẩm không hợp lệ'),
      requestQuantity: z.number().min(1, 'Số lượng không hợp lệ'),
      description: z.string(),
      product: z.object({
        code: z.optional(z.string()),
        slug: z.string().min(1, 'Mã sản phẩm không hợp lệ'),
        name: z.string().min(1, 'Tên sản phẩm không hợp lệ'),
        provider: z.string().min(1, 'Nhà cung cấp không hợp lệ'),
        description: z.string(),
        unit: z.object({
          slug: z.string().min(1, 'Mã đơn vị không hợp lệ'),
          name: z.string().min(1, 'Tên đơn vị không hợp lệ')
        }),
        quantity: z.number().min(0, 'Số lượng không hợp lệ')
      })
    })
  ),
  userApprovals: z.array(
    z.object({
      userSlug: z.string().min(1, 'Mã người duyệt không hợp lệ'),
      roleApproval: z.string().min(1, 'Vai trò duyệt không hợp lệ')
    })
  ),
  note: z.string().optional()
})

export const productRequisitionGeneralInfoSchema = z.object({
  code: z.string().min(1, 'Mã yêu cầu không hợp lệ'),
  requester: z.string().min(1, 'Tên người yêu cầu không hợp lệ'),
  deadlineApproval: z
    .string()
    .min(1, 'Ngày hết hạn không hợp lệ')
    .refine((date) => new Date(date) > new Date(), {
      message: 'Ngày hết hạn phải là thời điểm trong tương lai'
    }),
  company: z.object({
    slug: z.string().min(1, 'Mã công ty không hợp lệ'),
    name: z.string().min(1, 'Tên công ty không hợp lệ')
  }),
  site: z.object({
    slug: z.string().min(1, 'Mã công trình không hợp lệ'),
    name: z.string().min(1, 'Tên công trình không hợp lệ')
  }),
  project: z.object({
    slug: z.string().min(1, 'Mã dự án không hợp lệ'),
    name: z.string().min(1, 'Tên dự án không hợp lệ')
  }),
  type: z.enum(['normal', 'urgent']),
  note: z.string().min(1, 'Ghi chú không hợp lệ')
})

export const productSearchSchema = z.object({
  name: z.string().optional().default('')
})

export const updateProductRequisitionGeneralInfoSchema = z.object({
  slug: z.string().min(1, 'Mã yêu cầu không hợp lệ'),
  project: z.string().min(1, 'Mã dự án không hợp lệ'),
  type: z.enum(['normal', 'urgent']),
  deadlineApproval: z
    .string()
    .min(1, 'Ngày hết hạn không hợp lệ')
    .refine((date) => new Date(date) > new Date(), {
      message: 'Ngày hết hạn phải là thời điểm trong tương lai'
    }),
  description: z.string().min(1, 'Mô tả không hợp lệ')
})

export const addNewProductSchema = z.object({
  code: z.optional(z.string()),
  slug: z.string().min(1, 'Mã sản phẩm không hợp lệ'),
  name: z.string().min(1, 'Tên sản phẩm không hợp lệ'),
  provider: z.string().min(1, 'Nhà cung cấp không hợp lệ'),
  unit: z.string().min(1, 'Đơn vị không hợp lệ'),
  requestQuantity: z.string().min(1, 'Số lượng không hợp lệ'),
  description: z.string().min(1, 'Mô tả không hợp lệ'),
  status: z.string().min(1, 'Trạng thái không hợp lệ')
})

export const addNewProductRequestSchema = z.object({
  // code: z.string().min(1, 'Mã sản phẩm không hợp lệ'),
  isExistProduct: z.boolean(),
  slug: z.string(),
  product: z.object({
    code: z.optional(z.string()),
    slug: z.optional(z.string()),
    name: z.string().min(1, 'Tên sản phẩm không hợp lệ'),
    provider: z.string().min(1, 'Nhà cung cấp không hợp lệ'),
    quantity: z.number().min(1, 'Số lượng không hợp lệ'),
    unit: z.object({
      slug: z.string().min(1, 'Mã đơn vị không hợp lệ'),
      name: z.string().min(1, 'Tên đơn vị không hợp lệ')
    }),
    description: z.string().min(1, 'Mô tả không hợp lệ')
  }),
  // name: z.string().min(1, 'Tên sản phẩm không hợp lệ'),
  // provider: z.string().min(1, 'Nhà cung cấp không hợp lệ'),
  // unit: z.object({
  //   slug: z.string().min(1, 'Mã đơn vị không hợp lệ'),
  //   name: z.string().min(1, 'Đơn vị không hợp lệ')
  // }),
  requestQuantity: z.number().min(1, 'Số lượng không hợp lệ')
  // description: z.string().min(1, 'Mô tả không hợp lệ')
  // status: z.string().optional()
})

export const addNewNonExistingProductRequisitionSchema = z.object({
  // code: z.string().min(1, 'Mã sản phẩm không hợp lệ'),
  isExistProduct: z.boolean(),
  slug: z.optional(z.string()),
  product: z.object({
    // code: z.string().min(1, 'Mã sản phẩm không hợp lệ'),
    slug: z.optional(z.string()),
    name: z.string().min(1, 'Tên sản phẩm không hợp lệ'),
    provider: z.string().min(1, 'Nhà cung cấp không hợp lệ'),
    quantity: z.number().min(1, 'Số lượng không hợp lệ'),
    unit: z.object({
      slug: z.string().min(1, 'Mã đơn vị không hợp lệ'),
      name: z.string().min(1, 'Tên đơn vị không hợp lệ')
    }),
    description: z.string().min(1, 'Mô tả không hợp lệ')
  }),
  // name: z.string().min(1, 'Tên sản phẩm không hợp lệ'),
  // provider: z.string().min(1, 'Nhà cung cấp không hợp lệ'),
  // unit: z.object({
  //   slug: z.string().min(1, 'Mã đơn vị không hợp lệ'),
  //   name: z.string().min(1, 'Đơn vị không hợp lệ')
  // }),
  requestQuantity: z.number().min(1, 'Số lượng không hợp lệ')
  // description: z.string().min(1, 'Mô tả không hợp lệ')
  // status: z.string().optional()
})

export const updateProductRequestSchema = z.object({
  // code: z.string().min(1, 'Mã sản phẩm không hợp lệ'),
  slug: z.string(),
  isExistProduct: z.boolean(),
  // description: z.string(),
  // newQuantity: z.number().min(1, 'Số lượng không hợp lệ'),
  product: z.object({
    code: z.optional(z.string()),
    slug: z.optional(z.string()),
    name: z.string().min(1, 'Tên sản phẩm không hợp lệ'),
    provider: z.string().min(1, 'Nhà cung cấp không hợp lệ'),
    quantity: z.number().min(1, 'Số lượng không hợp lệ'),
    unit: z.object({
      slug: z.string().min(1, 'Mã đơn vị không hợp lệ'),
      name: z.string().min(1, 'Tên đơn vị không hợp lệ')
    }),
    description: z.string().min(1, 'Mô tả không hợp lệ')
  }),
  // name: z.string().min(1, 'Tên sản phẩm không hợp lệ'),
  // provider: z.string().min(1, 'Nhà cung cấp không hợp lệ'),
  // unit: z.object({
  //   slug: z.string().min(1, 'Mã đơn vị không hợp lệ'),
  //   name: z.string().min(1, 'Đơn vị không hợp lệ')
  // }),
  requestQuantity: z.number().min(1, 'Số lượng không hợp lệ')
  // description: z.string().min(1, 'Mô tả không hợp lệ')
  // status: z.string().optional()
})

export const approvalRequisitionSchema = z.object({
  message: z.string().min(1, 'Lời nhắn không được để trống')
})

export const resubmitRequisitionSchema = z.object({
  description: z.string().min(1, 'Lời nhắn không được để trống')
})

export type TProductRequisitionSchema = z.infer<typeof productRequisitionSchema>
export type TAddNewProductRequestSchema = z.infer<typeof addNewProductRequestSchema>
export type TAddNewNonExistingProductRequisitionSchema = z.infer<
  typeof addNewNonExistingProductRequisitionSchema
>
export type TProductRequisitionGeneralInfoSchema = z.infer<
  typeof productRequisitionGeneralInfoSchema
>
export type TUpdateProductRequestSchema = z.infer<typeof updateProductRequestSchema>
export type TUpdateProductRequisitionGeneralInfoSchema = z.infer<
  typeof updateProductRequisitionGeneralInfoSchema
>
