import React from 'react';
import { Input } from '@/components/ui/input';

interface SizeStock {
    size: string;
    count: number;
}

interface SizeOption {
    label: string;
    value: string;
}

interface SizeStockSelectorProps {
    selectedSizes: SizeStock[];
    onToggleSize: (size: string) => void;
    onSizeCountChange: (size: string, count: number) => void;
    sizeOptions: SizeOption[];
    t: (key: string, options?: any) => string;
}

const SizeStockSelector: React.FC<SizeStockSelectorProps> = ({
    selectedSizes,
    onToggleSize,
    onSizeCountChange,
    sizeOptions,
    t,
}) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-3 mb-2">
                {sizeOptions.map(opt => {
                    const checked = selectedSizes.some(s => s.size === opt.value);
                    return (
                        <label key={opt.value} className={`flex items-center gap-1 cursor-pointer px-2 py-1 rounded border ${checked ? 'bg-blue-100 border-blue-400' : 'border-gray-300'}`}>
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => onToggleSize(opt.value)}
                                className="accent-blue-500"
                            />
                            <span>{opt.label} ({opt.value})</span>
                        </label>
                    );
                })}
            </div>
            {selectedSizes.length > 0 && (
                <div className="flex flex-wrap gap-4">
                    {selectedSizes.map(({ size, count }) => (
                        <div key={size} className="flex items-center gap-2">
                            <span className="w-10 text-center font-semibold">{size}</span>
                            <Input
                                type="number"
                                min={0}
                                value={count}
                                onChange={e => onSizeCountChange(size, Number(e.target.value))}
                                className="w-20 rounded text-base bg-neutral-100 px-4 py-[13px] border-none"
                                placeholder={t('admin.productStock', { defaultValue: 'Stock' })}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SizeStockSelector; 