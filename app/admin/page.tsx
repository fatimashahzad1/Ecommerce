"use client";
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function AdminDashboardPage() {
    const { t } = useTranslation();
    return (
        <div className="p-4 md:p-8 max-w-3xl mx-auto bg-gray-50 min-h-[80vh] flex flex-col items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 w-full">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 text-center">
                    {t('admin.dashboardTitle', 'Admin Dashboard')}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link href="/admin/categories" className="flex flex-col items-center justify-center p-6 bg-blue-50 rounded-xl shadow hover:bg-blue-100 transition group">
                        <span className="text-blue-700 text-2xl font-semibold mb-2 group-hover:underline">{t('admin.manageCategories', 'Manage Categories')}</span>
                        <span className="text-blue-500 text-center text-sm">{t('admin.manageCategoriesDesc', 'Add, edit, or remove product categories')}</span>
                    </Link>
                    <Link href="/admin/products" className="flex flex-col items-center justify-center p-6 bg-green-50 rounded-xl shadow hover:bg-green-100 transition group">
                        <span className="text-green-700 text-2xl font-semibold mb-2 group-hover:underline">{t('admin.manageProducts', 'Manage Products')}</span>
                        <span className="text-green-500 text-center text-sm">{t('admin.manageProductsDesc', 'Add, edit, or remove products')}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
} 