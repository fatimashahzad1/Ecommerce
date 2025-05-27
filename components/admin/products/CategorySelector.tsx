import React from 'react';
import type { Category } from '@/types/categories';
import { FormMessage } from "@/components/ui/form";

interface CategorySelectorProps {
    categories: Category[];
    selectedCategoryId: string;
    selectedSubcategoryId: string;
    onCategoryChange: (id: string) => void;
    onSubcategoryChange: (id: string) => void;
    t: (key: string, options?: any) => string;
    categoryError: string;
    subcategoryError: string;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
    categories,
    selectedCategoryId,
    selectedSubcategoryId,
    onCategoryChange,
    onSubcategoryChange,
    t,
    categoryError,
    subcategoryError,
}) => {
    const parentCategories = categories.filter(cat => !cat.parentId);
    const subcategories = categories.filter(cat => cat.parentId === selectedCategoryId);

    return (
        <div className="flex gap-4 mb-4">
            <div className="flex-1">
                <label className="text-base font-medium block mb-1">{t('admin.productCategory', { defaultValue: 'Category' })}</label>
                <select
                    value={selectedCategoryId}
                    onChange={e => {
                        onCategoryChange(e.target.value);
                    }}
                    className="w-full rounded text-base bg-neutral-100 px-4 py-[13px] border-none"
                >
                    <option value="">{t('admin.productCategory', { defaultValue: 'Select category' })}</option>
                    {parentCategories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
                {categoryError && <FormMessage className="text-sm text-red-500 mt-1">{categoryError}</FormMessage>}
            </div>
            <div className="flex-1">
                <label className="text-base font-medium block mb-1">{t('admin.productSubcategory', { defaultValue: 'Subcategory' })}</label>
                <select
                    value={selectedSubcategoryId}
                    onChange={e => onSubcategoryChange(e.target.value)}
                    className="w-full rounded text-base bg-neutral-100 px-4 py-[13px] border-none"
                    disabled={subcategories.length === 0}
                >
                    <option value="">{t('admin.productSubcategory', { defaultValue: 'Select subcategory' })}</option>
                    {subcategories.map(sub => (
                        <option key={sub.id} value={sub.id}>{sub.name}</option>
                    ))}
                </select>
                {subcategoryError && <FormMessage className="text-sm text-red-500 mt-1">{subcategoryError}</FormMessage>}
            </div>
        </div>
    );
};

export default CategorySelector; 