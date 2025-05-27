"use client";
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ToggleSwitches from '@/components/admin/products/ToggleSwitches';
import ImageUpload from '@/components/admin/products/ImageUpload';
import GalleryUpload from '@/components/admin/products/GalleryUpload';
import SizeStockSelector from '@/components/admin/products/SizeStockSelector';
import CategorySelector from '@/components/admin/products/CategorySelector';
import ColorPicker from '@/components/admin/products/ColorPicker';
import { uploadToCloudinary } from "@/utils/cloudinary";
import { SIZE_OPTIONS } from "@/constants";
import { ADMIN_PRODUCT_FORM_FIELDS } from "@/constants/forms";
import useAdminProductForm from "@/hooks/useAdminProductForm";
import AdminCustomFormField from "@/components/admin/products/AdminCustomFormField";

/**
 * Admin Add/Edit Product Page
 * Handles orchestration and form submission for the product form.
 * All major UI blocks and helpers are modularized.
 */
function AddOrEditProductPage() {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams?.get('id');
    const { products, loading, error } = useAppSelector((state: import('@/store/store').RootState) => state.products);
    const { categories } = useAppSelector((state: import('@/store/store').RootState) => state.categories);
    const { toast } = useToast();

    const {
        form,
        imageUrl,
        setImageUrl,
        uploadProgress,
        setUploadProgress,
        uploading,
        setUploading,
        fileInputRef,
        gallery,
        galleryInputRefs,
        selectedCategoryId,
        setSelectedCategoryId,
        selectedSubcategoryId,
        setSelectedSubcategoryId,
        selectedColors,
        selectedSizes,
        handleAddColor,
        handleRemoveColor,
        handleToggleSize,
        handleSizeCountChange,
        handleGalleryFileChange,
        handleDeleteGalleryImage,
        onSubmit,
        MAX_COLORS,
    } = useAdminProductForm({ t, id, products, categories, dispatch, router, toast });

    return (
        <div className="p-8 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">
                {id ? t('admin.editProduct', 'Edit Product') : t('admin.addProduct', 'Add Product')}
            </h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white rounded shadow p-6">
                    {ADMIN_PRODUCT_FORM_FIELDS.map(field => {
                        if (field.isCustom) return (
                            <FormField
                                key={field.name}
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-medium">{t('admin.productImage', 'Image')}</FormLabel>
                                        <FormControl>
                                            <ImageUpload
                                                value={imageUrl}
                                                onChange={url => {
                                                    setImageUrl(url);
                                                    form.setValue('image', url, { shouldValidate: true });
                                                }}
                                                onUpload={async (file) => {
                                                    try {
                                                        const url = await uploadToCloudinary(file, setUploadProgress, setUploading);
                                                        setImageUrl(url);
                                                        form.setValue('image', url, { shouldValidate: true });
                                                    } catch (err: any) {
                                                        toast({
                                                            title: t('admin.productError', 'Error'),
                                                            description: err?.message ?? t('admin.productImageUploadError', 'Image upload failed.'),
                                                            variant: 'destructive',
                                                        });
                                                    }
                                                }}
                                                onDelete={() => {
                                                    setImageUrl('');
                                                    form.setValue('image', '', { shouldValidate: true });
                                                    if (fileInputRef.current) fileInputRef.current.value = '';
                                                }}
                                                uploading={uploading}
                                                progress={uploadProgress}
                                                error={form.formState.errors.image?.message as string}
                                                t={t}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        );
                        return (
                            <AdminCustomFormField
                                key={field.name}
                                control={form.control}
                                name={field.name}
                                label={t(field.labelKey, field.defaultLabel)}
                                type={field.type}
                                placeholder={field.defaultLabel}
                                step={field.step}
                                min={field.min}
                                max={field.max}
                                t={t}
                            />
                        );
                    })}
                    <ToggleSwitches control={form.control} t={t} />
                    <FormField
                        control={form.control}
                        name="colors"
                        render={() => (
                            <FormItem>
                                <FormLabel className="text-base font-medium">{t('admin.productColors', 'Colors')}</FormLabel>
                                <FormControl>
                                    <ColorPicker
                                        selectedColors={selectedColors}
                                        onAddColor={handleAddColor}
                                        onRemoveColor={handleRemoveColor}
                                        maxColors={MAX_COLORS}
                                        t={t}
                                    />
                                </FormControl>
                                <FormMessage className="text-sm text-red-500 mt-1" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="sizes"
                        render={() => (
                            <FormItem>
                                <FormLabel className="text-base font-medium">{t('admin.productSizes', 'Sizes')}</FormLabel>
                                <FormControl>
                                    <SizeStockSelector
                                        selectedSizes={selectedSizes}
                                        onToggleSize={handleToggleSize}
                                        onSizeCountChange={handleSizeCountChange}
                                        sizeOptions={SIZE_OPTIONS}
                                        t={t}
                                    />
                                </FormControl>
                                <FormMessage className="text-sm text-red-500 mt-1" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="stockStatus"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-medium">{t('admin.productStockStatus', 'Stock Status')}</FormLabel>
                                <FormControl>
                                    <select {...field} className="w-full rounded text-base bg-neutral-100 px-4 py-[13px] border-none">
                                        <option value="">{t('admin.productStockStatus', 'Select stock status')}</option>
                                        <option value="In Stock">{t('admin.inStock', 'In Stock')}</option>
                                        <option value="Out of Stock">{t('admin.outOfStock', 'Out of Stock')}</option>
                                        <option value="Limited Stock">{t('admin.limitedStock', 'Limited Stock')}</option>
                                    </select>
                                </FormControl>
                                <FormMessage className="text-sm text-red-500 mt-1" />
                            </FormItem>
                        )}
                    />
                    <CategorySelector
                        categories={categories}
                        selectedCategoryId={selectedCategoryId}
                        selectedSubcategoryId={selectedSubcategoryId}
                        onCategoryChange={id => {
                            setSelectedCategoryId(id);
                            setSelectedSubcategoryId("");
                        }}
                        onSubcategoryChange={setSelectedSubcategoryId}
                        categoryError={form.formState.errors.categoryId?.message as string}
                        subcategoryError={form.formState.errors.subcategoryId?.message as string}
                        t={t}
                    />
                    <GalleryUpload
                        gallery={gallery}
                        onUpload={handleGalleryFileChange}
                        onDelete={handleDeleteGalleryImage}
                        t={t}
                        inputRefs={galleryInputRefs}
                    />
                    <Button type="submit" disabled={loading} className="w-full text-neutral-50 rounded text-base font-medium bg-[#DB4444] px-12 py-4 hover:bg-[#c13e3e]" >
                        {id
                            ? t('admin.saveProduct', 'Save Changes')
                            : t('admin.saveProduct', 'Save Product')}
                    </Button>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </form>
            </Form>
        </div>
    );
}

export default function AddOrEditProductPageWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AddOrEditProductPage />
        </Suspense>
    );
} 