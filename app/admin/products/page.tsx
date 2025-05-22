"use client";
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { fetchProducts, deleteProduct } from '@/store/productSlice';
import { fetchCategories } from '@/store/categorySlice';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/Pagination';
import ProductTableSkeleton from '@/components/skeleton/ProductTableSkeleton';

export default function AdminProductsPage() {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { products, loading, error } = useAppSelector((state: import('@/store/store').RootState) => state.products);
    const { categories } = useAppSelector((state: import('@/store/store').RootState) => state.categories);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const PRODUCTS_PER_PAGE = 5;
    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
    const sortedProducts = [...products].sort((a, b) => a.title.localeCompare(b.title));
    const paginatedProducts = sortedProducts.slice(
        (currentPage - 1) * PRODUCTS_PER_PAGE,
        currentPage * PRODUCTS_PER_PAGE
    );

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
        if (categories.length === 0) {
            dispatch(fetchCategories());
        }
    }, [dispatch, products, categories]);

    const handleDelete = async () => {
        if (!deleteId) return;
        setDeleting(true);
        setDeleteError(null);
        try {
            await dispatch(deleteProduct(deleteId));
            setDeleteId(null);
        } catch (err: any) {
            setDeleteError(err.message ?? t('admin.deleteError', 'Delete failed.'));
        } finally {
            setDeleting(false);
        }
    };

    // Helpers to get category/subcategory names
    const getCategoryName = (categoryId: string | undefined) => {
        if (!categoryId) return t('admin.unknown', 'Unknown');
        const cat = categories.find((c) => c.id === categoryId && !c.parentId);
        return cat ? cat.name : t('admin.unknown', 'Unknown');
    };
    const getSubcategoryName = (subcategoryId: string | undefined) => {
        if (!subcategoryId) return t('admin.none', 'None');
        const sub = categories.find((c) => c.id === subcategoryId && !!c.parentId);
        return sub ? sub.name : t('admin.none', 'None');
    };
    const renderColors = (colors?: string[]) =>
        colors && colors.length > 0 ? (
            <div className="flex gap-1">
                {colors.map((color, idx) => (
                    <span
                        key={color + idx}
                        className="inline-block w-5 h-5 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                    >
                        <span className="sr-only">{color}</span>
                    </span>
                ))}
            </div>
        ) : '-';
    const renderSizes = (sizes?: { size: string; count: number }[]) =>
        sizes && sizes.length > 0 ? (
            <div className="flex flex-wrap gap-1">
                {sizes.map((s, idx) => (
                    <span
                        key={s.size + idx}
                        className="inline-block px-2 py-1 rounded-full bg-gray-200 text-gray-800 text-xs font-medium border"
                    >
                        {s.size} ({s.count})
                    </span>
                ))}
            </div>
        ) : '-';

    let content;
    if (loading) {
        content = <ProductTableSkeleton />;
    } else if (error) {
        content = <p className="text-red-500">{error}</p>;
    } else if (products.length === 0) {
        content = (
            <div className="bg-white rounded-xl shadow p-6">
                <p className="text-gray-500 text-center text-lg">{t('admin.noProducts', 'No products yet.')}</p>
            </div>
        );
    } else {
        content = (
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
                <div className="overflow-x-auto">
                    <table className="min-w-full border-separate border-spacing-0">
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
                            {paginatedProducts.map((product, idx) => (
                                <tr key={product.id} className={idx % 2 === 0 ? 'bg-gray-50 hover:bg-blue-50 transition' : 'bg-white hover:bg-blue-50 transition'}>
                                    <td className="px-4 py-3 align-middle">
                                        <img src={product.image} alt={product.title} className="w-14 h-14 object-contain rounded shadow-sm border" />
                                    </td>
                                    <td className="px-4 py-3 align-middle font-medium text-gray-900">{product.title}</td>
                                    <td className="px-4 py-3 align-middle">${product.price}</td>
                                    <td className="px-4 py-3 align-middle">{product.originalPrice !== undefined ? `$${product.originalPrice}` : '-'}</td>
                                    <td className="px-4 py-3 align-middle">{product.discount !== undefined ? `${product.discount}%` : '-'}</td>
                                    <td className="px-4 py-3 align-middle">
                                        <span className={
                                            product.stockStatus === 'In Stock' ? 'inline-block px-2 py-1 rounded bg-green-100 text-green-800 text-xs font-semibold' :
                                                product.stockStatus === 'Out of Stock' ? 'inline-block px-2 py-1 rounded bg-red-100 text-red-800 text-xs font-semibold' :
                                                    'inline-block px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs font-semibold'
                                        }>
                                            {product.stockStatus || t('admin.inStock', 'In Stock')}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 align-middle">{getCategoryName(product.categoryId)}</td>
                                    <td className="px-4 py-3 align-middle">{getSubcategoryName(product.subcategoryId)}</td>
                                    <td className="px-4 py-3 align-middle">{renderColors(product.colors)}</td>
                                    <td className="px-4 py-3 align-middle">{renderSizes(product.sizes)}</td>
                                    <td className="px-4 py-3 align-middle">{product.rating !== undefined ? product.rating : '-'}</td>
                                    <td className="px-4 py-3 align-middle">{product.reviewCount !== undefined ? product.reviewCount : '-'}</td>
                                    <td className="px-4 py-3 align-middle">
                                        <span className={product.bestSelling ? 'inline-block px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-semibold' : 'inline-block px-2 py-1 rounded bg-gray-200 text-gray-600 text-xs font-semibold'}>
                                            {product.bestSelling ? t('admin.yes', 'Yes') : t('admin.no', 'No')}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 align-middle">
                                        <span className={product.featured ? 'inline-block px-2 py-1 rounded bg-purple-100 text-purple-800 text-xs font-semibold' : 'inline-block px-2 py-1 rounded bg-gray-200 text-gray-600 text-xs font-semibold'}>
                                            {product.featured ? t('admin.yes', 'Yes') : t('admin.no', 'No')}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 align-middle whitespace-pre-line break-words">{product.description || '-'}</td>
                                    <td className="px-4 py-3 space-x-2 flex flex-col justify-center items-center gap-2">
                                        <Link href={`/admin/products/add?id=${product.id}`} className="inline-block px-3 py-1 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition">
                                            {t('admin.edit', 'Edit')}
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="inline-block px-3 py-1 rounded text-xs font-semibold"
                                            onClick={() => setDeleteId(String(product.id))}
                                            disabled={deleting}
                                        >
                                            {t('admin.delete', 'Delete')}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    page={currentPage}
                    pageCount={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-900">{t('admin.productsTitle', 'Products')}</h1>
                <Link href="/admin/products/add" className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition text-base font-semibold">
                    {t('admin.addProduct', 'Add Product')}
                </Link>
            </div>
            {content}
            {/* Delete confirmation dialog */}
            {deleteId && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
                        <h2 className="text-xl font-bold mb-4 text-gray-900">{t('admin.confirmDelete', 'Confirm Delete')}</h2>
                        <p className="mb-4 text-gray-700">{t('admin.confirmDeleteProduct', 'Are you sure you want to delete this product?')}</p>
                        {deleteError && <p className="text-red-500 mb-2">{deleteError}</p>}
                        <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setDeleteId(null)} disabled={deleting} className="px-4 py-2 rounded">
                                {t('admin.cancel', 'Cancel')}
                            </Button>
                            <Button variant="destructive" onClick={handleDelete} disabled={deleting} className="px-4 py-2 rounded">
                                {deleting ? t('admin.deleting', 'Deleting...') : t('admin.delete', 'Delete')}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 