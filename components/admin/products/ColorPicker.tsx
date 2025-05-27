import React from 'react';
import { CloseIcon } from '@/components/icons';

interface ColorPickerProps {
    selectedColors: string[];
    onAddColor: (color: string) => void;
    onRemoveColor: (color: string) => void;
    maxColors: number;
    t: (key: string, options?: any) => string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColors, onAddColor, onRemoveColor, maxColors, t }) => {
    return (
        <div>
            <div className="flex gap-2 mb-2">
                {selectedColors.map((color) => (
                    <div key={color} className="relative inline-block">
                        <span
                            className="inline-block w-7 h-7 rounded-full border-2 border-white shadow"
                            style={{ backgroundColor: color }}
                        />
                        <button
                            type="button"
                            className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 border border-gray-200 hover:bg-red-100"
                            onClick={() => onRemoveColor(color)}
                            aria-label={t('admin.removeColor', { defaultValue: 'Remove color' })}
                        >
                            <CloseIcon className="w-3 h-3 text-red-500" />
                        </button>
                    </div>
                ))}
                {selectedColors.length < maxColors && (
                    <label className="inline-block cursor-pointer">
                        <span className="inline-block w-7 h-7 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xl">+</span>
                        <input
                            type="color"
                            className="hidden"
                            onChange={e => {
                                onAddColor(e.target.value);
                                e.target.value = '';
                            }}
                        />
                    </label>
                )}
            </div>
        </div>
    );
};

export default ColorPicker; 