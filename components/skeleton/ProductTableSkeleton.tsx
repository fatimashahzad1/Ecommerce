import React from 'react'
import { Skeleton } from "../ui/skeleton"
import { useTranslation } from "react-i18next";

const ProductTableSkeleton = () => {
    const { t } = useTranslation();
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0 bg-white rounded-xl shadow-lg">
                <thead className="sticky top-0 z-10 bg-white/95 backdrop-blur">
                    <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">{t('admin.productImage', 'Image')}</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">{t('admin.productTitle', 'Title')}</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">{t('admin.productPrice', 'Price')}</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">{t('admin.productOriginalPrice', 'Original Price')}</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">{t('admin.productDiscount', 'Discount')}</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">{t('admin.productStockStatus', 'Stock')}</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">{t('admin.productCategory', 'Category')}</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">{t('admin.productSubcategory', 'Subcategory')}</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">{t('admin.productColors', 'Colors')}</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">{t('admin.productSizes', 'Sizes')}</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">{t('admin.productRating', 'Rating')}</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">{t('admin.productReviewCount', 'Reviews')}</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">{t('admin.productBestSelling', 'Best Selling')}</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">{t('admin.productFeatured', 'Featured')}</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">{t('admin.productDescription', 'Description')}</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">{t('admin.actions', 'Actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(5)].map((_, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="px-4 py-3 align-middle"><Skeleton className="w-14 h-14 rounded-full" /></td>
                            <td className="px-4 py-3 align-middle"><Skeleton className="h-4 w-24" /></td>
                            <td className="px-4 py-3 align-middle"><Skeleton className="h-4 w-12" /></td>
                            <td className="px-4 py-3 align-middle"><Skeleton className="h-4 w-12" /></td>
                            <td className="px-4 py-3 align-middle"><Skeleton className="h-4 w-10" /></td>
                            <td className="px-4 py-3 align-middle"><Skeleton className="h-4 w-16 rounded-full" /></td>
                            <td className="px-4 py-3 align-middle"><Skeleton className="h-4 w-20" /></td>
                            <td className="px-4 py-3 align-middle"><Skeleton className="h-4 w-20" /></td>
                            <td className="px-4 py-3 align-middle">
                                <div className="flex gap-1">
                                    {[...Array(3)].map((_, j) => (
                                        <Skeleton key={j} className="w-5 h-5 rounded-full" />
                                    ))}
                                </div>
                            </td>
                            <td className="px-4 py-3 align-middle">
                                <div className="flex gap-1 flex-wrap">
                                    {[...Array(2)].map((_, j) => (
                                        <Skeleton key={j} className="h-5 w-12 rounded-full" />
                                    ))}
                                </div>
                            </td>
                            <td className="px-4 py-3 align-middle"><Skeleton className="h-4 w-10" /></td>
                            <td className="px-4 py-3 align-middle"><Skeleton className="h-4 w-10" /></td>
                            <td className="px-4 py-3 align-middle"><Skeleton className="h-4 w-14 rounded-full" /></td>
                            <td className="px-4 py-3 align-middle"><Skeleton className="h-4 w-14 rounded-full" /></td>
                            <td className="px-4 py-3 align-middle"><Skeleton className="h-4 w-40" /></td>
                            <td className="px-4 py-3 align-middle">
                                <div className="flex justify-center items-center gap-2">
                                    <Skeleton className="h-8 w-14 rounded" />
                                    <Skeleton className="h-8 w-14 rounded" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProductTableSkeleton 