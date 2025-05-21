import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import React from 'react';
import type { TFunction } from 'i18next';

interface ToggleSwitchesProps {
    control: any;
    t: TFunction;
}

export const ToggleSwitches: React.FC<ToggleSwitchesProps> = ({ control, t }) => (
    <div className="flex flex-row gap-8 bg-neutral-50 rounded-lg p-4 mb-4 shadow-sm">
        <FormField
            control={control}
            name="bestSelling"
            render={({ field }) => (
                <FormItem className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">⭐</span>
                        <FormLabel className="text-base font-medium">{t('admin.productBestSelling', { defaultValue: 'Best Selling' })}</FormLabel>
                    </div>
                    <FormControl>
                        <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-yellow-400"
                        />
                    </FormControl>
                    <span className="text-xs text-gray-500 mt-1 block">{t('admin.productBestSellingHint', { defaultValue: 'Mark as a top-selling product' })}</span>
                    <FormMessage className="text-sm text-red-500 mt-1" />
                </FormItem>
            )}
        />
        <FormField
            control={control}
            name="featured"
            render={({ field }) => (
                <FormItem className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">🏅</span>
                        <FormLabel className="text-base font-medium">{t('admin.productFeatured', { defaultValue: 'Featured' })}</FormLabel>
                    </div>
                    <FormControl>
                        <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-green-500"
                        />
                    </FormControl>
                    <span className="text-xs text-gray-500 mt-1 block">{t('admin.productFeaturedHint', { defaultValue: 'Highlight as a featured product' })}</span>
                    <FormMessage className="text-sm text-red-500 mt-1" />
                </FormItem>
            )}
        />
    </div>
);

export default ToggleSwitches; 