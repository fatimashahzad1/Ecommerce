import React from 'react'
import { Skeleton } from "../ui/skeleton"
import { useTranslation } from "react-i18next";

const AdminTableSkeleton = () => {
    const { t } = useTranslation();
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-left">{t('admin.categoryIcon', 'Icon')}</th>
                        <th className="px-4 py-2 text-left">{t('admin.categoryName', 'Name')}</th>
                        <th className="px-4 py-2 text-left">{t('admin.parentCategory', 'Parent')}</th>
                        <th className="px-4 py-2 text-left">{t('admin.actions', 'Actions')}</th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(5)].map((_, i) => (
                        <tr key={i} className="border-t">
                            <td className="px-4 py-2">
                                <Skeleton className="w-8 h-8 rounded" />
                            </td>
                            <td className="px-4 py-2">
                                <Skeleton className="h-4 w-24" />
                            </td>
                            <td className="px-4 py-2">
                                <Skeleton className="h-4 w-20" />
                            </td>
                            <td className="px-4 py-2 space-x-2">
                                <Skeleton className="inline-block h-8 w-12 mr-2" />
                                <Skeleton className="inline-block h-8 w-12" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminTableSkeleton
