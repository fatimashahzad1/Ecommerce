import React, { useRef } from 'react';
import { CloseIcon } from '@/components/icons';
import { FormMessage } from "@/components/ui/form";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    onUpload: (file: File) => Promise<void>;
    onDelete: () => void;
    uploading: boolean;
    progress: number | null;
    error?: string;
    t: (key: string, options?: any) => string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    value,
    onChange,
    onUpload,
    onDelete,
    uploading,
    progress,
    error,
    t,
}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        await onUpload(file);
    };

    const handleBoxClick = () => {
        if (!value && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="flex flex-col items-center w-full">
            <div
                className="relative w-40 h-40 mb-2 flex items-center justify-center border-2 border-dashed rounded bg-gray-50 overflow-hidden cursor-pointer"
                onClick={handleBoxClick}
                tabIndex={0}
                role="button"
                aria-label={t('admin.uploadImage', { defaultValue: 'Upload image' })}
                onKeyDown={e => {
                    if ((e.key === 'Enter' || e.key === ' ') && !value) {
                        handleBoxClick();
                    }
                }}
            >
                {value ? (
                    <>
                        <img src={value} alt="Product" className="object-cover w-full h-full self" />
                        <button
                            type="button"
                            className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 hover:bg-red-100"
                            onClick={onDelete}
                            aria-label={t('admin.deleteImage', { defaultValue: 'Delete image' })}
                        >
                            <CloseIcon className="w-5 h-5 text-red-500" />
                        </button>
                    </>
                ) : (
                    <span className="text-gray-400 text-4xl">+</span>
                )}
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    tabIndex={-1}
                />
            </div>
            {uploading && (
                <div className="flex flex-col items-center w-full">
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full transition-all"
                            style={{ width: `${progress ?? 0}%` }}
                        />

                    </div>
                    <span className="text-xs text-gray-600 ml-2">{progress ?? 0}%</span>
                </div>
            )}
            {error && <FormMessage className="text-sm text-red-500 mt-1">{error}</FormMessage>}
        </div>
    );
};

export default ImageUpload; 