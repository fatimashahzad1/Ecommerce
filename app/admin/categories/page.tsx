"use client";
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { fetchCategories, deleteCategory } from '@/store/categorySlice';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CATEGORIES as CATEGORY_ICONS } from '@/mocks/categories';
import { Pagination } from '@/components/ui/Pagination';
import AdminTableSkeleton from "@/components/skeleton/AdminTableSkeleton";

export default function AdminCategoriesPage() {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { categories, loading, error } = useAppSelector((state: import('@/store/store').RootState) => state.categories);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const CATEGORIES_PER_PAGE = 5;
    const totalCategories = categories.length;
    const totalPages = Math.ceil(totalCategories / CATEGORIES_PER_PAGE);
    const sortedCategories = [...categories].sort((a, b) => a.name.localeCompare(b.name));
    const paginatedCategories = sortedCategories.slice(
        (currentPage - 1) * CATEGORIES_PER_PAGE,
        currentPage * CATEGORIES_PER_PAGE
    );

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchCategories());
        }
    }, [dispatch, categories]);

    // Helper to get parent category name
    const getParentName = (parentId: string | undefined) => {
        if (!parentId) return t('admin.noParent', 'No Parent');
        const parent = categories.find((cat) => cat.id === parentId);
        return parent ? parent.name : t('admin.unknown', 'Unknown');
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        setDeleting(true);
        setDeleteError(null);
        try {
            await dispatch(deleteCategory(deleteId));
            setDeleteId(null);
        } catch (err: any) {
            setDeleteError(err.message ?? t('admin.deleteError', 'Delete failed.'));
        } finally {
            setDeleting(false);
        }
    };

    let content;
    if (loading) {
        content = <AdminTableSkeleton />;
    } else if (error) {
        content = <p className="text-red-500">{error}</p>;
    } else if (categories.length === 0) {
        content = (
            <div className="bg-white rounded-xl shadow p-6">
                <p className="text-gray-500 text-center text-lg">{t('admin.noCategories', 'No categories yet.')}</p>
            </div>
        );
    } else {
        content = (
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
                <div className="overflow-x-auto">
                    <table className="min-w-full border-separate border-spacing-0">
                        <thead className="sticky top-0 z-10 bg-white/95 backdrop-blur">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">{t('admin.categoryIcon', 'Icon')}</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">{t('admin.categoryName', 'Name')}</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">{t('admin.parentCategory', 'Parent')}</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">{t('admin.actions', 'Actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedCategories.map((category, idx) => (
                                <tr key={category.id} className={idx % 2 === 0 ? 'bg-gray-50 hover:bg-blue-50 transition' : 'bg-white hover:bg-blue-50 transition'}>
                                    <td className="px-4 py-3 align-middle">
                                        <span className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center border shadow-sm">
                                            {(CATEGORY_ICONS.find((c) => c.name === category.icon)?.Icon)
                                                ? React.createElement(CATEGORY_ICONS.find((c) => c.name === category.icon)!.Icon, { className: 'w-8 h-8', color: 'black' })
                                                : category.icon}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 align-middle font-medium text-gray-900">{category.name}</td>
                                    <td className="px-4 py-3 align-middle">{getParentName(category.parentId)}</td>
                                    <td className="px-4 py-3 space-x-2 flex flex-col justify-center items-center gap-2">
                                        <Link href={`/admin/categories/add?id=${category.id}`} className="inline-block px-3 py-1 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition">
                                            {t('admin.edit', 'Edit')}
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="inline-block px-3 py-1 rounded text-xs font-semibold"
                                            onClick={() => setDeleteId(String(category.id))}
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
                <h1 className="text-3xl font-bold text-gray-900">{t('admin.categoriesTitle', 'Categories')}</h1>
                <Link href="/admin/categories/add" className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition text-base font-semibold">
                    {t('admin.addCategory', 'Add Category')}
                </Link>
            </div>
            {content}
            {/* Delete confirmation dialog */}
            {deleteId && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
                        <h2 className="text-xl font-bold mb-4 text-gray-900">{t('admin.confirmDelete', 'Confirm Delete')}</h2>
                        <p className="mb-4 text-gray-700">{t('admin.confirmDeleteCategory', 'Are you sure you want to delete this category?')}</p>
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