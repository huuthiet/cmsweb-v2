import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Form,
  Button
} from '@/components/ui'
import { addNewProductRequestSchema, TAddNewProductRequestSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { IProductInfo } from '@/types'
import { SelectUnit } from '@/components/app/select'

interface IFormAddNewProductProps {
  data?: IProductInfo
  onSubmit: (data: TAddNewProductRequestSchema) => void
}

export const AddNewProductRequestForm: React.FC<IFormAddNewProductProps> = ({ data, onSubmit }) => {
  const { t } = useTranslation('products')
  const { t: tCommon } = useTranslation('common')
  const isEditMode = !!data

  const form = useForm<TAddNewProductRequestSchema>({
    resolver: zodResolver(addNewProductRequestSchema),
    defaultValues: {
      slug: data?.slug || '',
      product: {
        code: data?.code || '',
        slug: data?.slug || '',
        name: data?.name || '',
        provider: data?.provider || '',
        unit: { name: data?.unit.name || '', slug: data?.unit.slug || '' },
        quantity: data?.quantity || 1,
        description: data?.description || ''
      },
      isExistProduct: !!data,
      requestQuantity: data?.quantity || 1
    }
  })

  const handleSubmit = (values: TAddNewProductRequestSchema) => {
    const completeData: TAddNewProductRequestSchema = {
      ...values,
      requestQuantity: Number(values.requestQuantity),
      product: {
        ...values.product,
        unit: {
          name: values.product.unit.name,
          slug: values.product.unit.slug
        }
      }
    }
    onSubmit(completeData)
  }

  const productCode = form.watch('product.code')

  return (
    <div className="mt-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {productCode && (
              <FormField
                control={form.control}
                name="product.code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('products.code')}</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="product.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('products.name')}</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly={isEditMode} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="product.provider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('products.provider')}</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly={isEditMode} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="requestQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('products.quantity')}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      placeholder={t('products.quantity')}
                      {...field}
                      value={field.value ?? ''} // Cho phép null/undefined => hiển thị trống
                      onFocus={(e) => e.target.select()} // Chọn hết khi focus
                      onChange={(e) => {
                        const val = e.target.value;
                        // Cho phép rỗng để user gõ mới
                        field.onChange(val === '' ? '' : Number(val));
                      }}
                      onBlur={(e) => {
                        let val = Number(e.target.value);
                        if (!val || val < 1) val = 1; // Nếu trống hoặc < 1 => set về 1
                        field.onChange(val);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="product.unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('products.unit')}</FormLabel>
                  <FormControl>
                    <SelectUnit
                      onChange={(value) =>
                        field.onChange({ name: value?.label || '', slug: value?.value || '' })
                      }
                      defaultValue={
                        data?.unit ? { value: data.unit.slug, label: data.unit.name } : undefined
                      }
                      isDisabled={isEditMode}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="product.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('products.description')}</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly={isEditMode} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end w-full">
            <Button type="submit">{tCommon('common.add')}</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
