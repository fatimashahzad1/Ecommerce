import React, { RefObject } from 'react';
import { CloseIcon } from '@/components/icons';

export interface GalleryImage {
    url: string;
    uploading: boolean;
    progress: number | null;
}

interface GalleryUploadProps {
    gallery: GalleryImage[];
    onUpload: (e: React.ChangeEvent<HTMLInputElement>, idx: number) => void;
    onDelete: (idx: number) => void;
    t: (key: string, options?: any) => string;
    inputRefs: RefObject<(HTMLInputElement | null)[]>;
}

const GalleryUpload: React.FC<GalleryUploadProps> = ({ gallery, onUpload, onDelete, t, inputRefs }) => {
    const renderGalleryBox = (img: GalleryImage, idx: number) => {
        if (img.url) {
            return (
                <>
                    <img src={img.url} alt="Gallery" className="object-cover w-full h-full" />
                    <button
                        type="button"
                        className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 hover:bg-red-100"
                        onClick={() => onDelete(idx)}
                        aria-label={t('admin.deleteGalleryImage', { defaultValue: 'Delete gallery image' })}
                    >
                        <CloseIcon className="w-4 h-4 text-red-500" />
                    </button>
                </>
            );
        }
        if (img.uploading) {
            return (
                <div className="flex flex-col items-center w-full">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full transition-all"
                            style={{ width: `${img.progress ?? 0}%` }}
                        />
                    </div>
                    <span className="text-xs text-gray-600 mt-1">{img.progress ?? 0}%</span>
                </div>
            );
        }
        return (
            <>
                <button
                    type="button"
                    className="w-full h-full flex items-center justify-center text-gray-400 text-3xl focus:outline-none"
                    onClick={() => inputRefs.current && inputRefs.current[idx]?.click()}
                    aria-label={t('admin.uploadGalleryImage', { defaultValue: 'Upload gallery image' })}
                >
                    +
                </button>
                <input
                    type="file"
                    accept="image/*"
                    ref={el => {
                        if (inputRefs.current) inputRefs.current[idx] = el;
                    }}
                    onChange={e => onUpload(e, idx)}
                    className="hidden"
                />
            </>
        );
    };

    return (
        <div>
            <label className="block font-medium mb-2">{t('admin.productGallery', { defaultValue: 'Gallery Images' })}</label>
            <div className="flex gap-3">
                {gallery.map((img, idx) => (
                    <div key={idx} className="relative w-24 h-24 flex items-center justify-center border-2 border-dashed rounded bg-gray-50 overflow-hidden">
                        {renderGalleryBox(img, idx)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GalleryUpload; 