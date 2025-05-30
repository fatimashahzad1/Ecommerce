import { useState, useRef, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getProductFormSchema } from '@/lib/forms';
import { fetchCategories } from '@/store/categorySlice';
import { fetchProducts, addProduct, updateProduct } from '@/store/productSlice';
import { uploadToCloudinary } from '@/utils/cloudinary';
import { z } from 'zod';
// If ProductFormData is not exported from @/types/forms, define it here:
// import { ProductFormData } from '@/types/forms';
type ProductFormData = z.infer<ReturnType<typeof getProductFormSchema>>;

function useAdminProductForm({
  t,
  id,
  products,
  categories,
  dispatch,
  router,
  toast,
}: any) {
  const productSchema = getProductFormSchema(t);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [gallery, setGallery] = useState<
    {
      url: string;
      uploading: boolean;
      progress: number | null;
    }[]
  >(() => {
    const initial: any[] = Array(5).fill(null);
    const productGallery = [].slice(0, 5);
    return initial.map((_, i) =>
      productGallery[i]
        ? { url: productGallery[i], uploading: false, progress: null }
        : { url: '', uploading: false, progress: null }
    );
  });
  const galleryInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedSubcategoryId, setSelectedSubcategoryId] =
    useState<string>('');
  const MAX_COLORS = 5;
  const product = useMemo(
    () => products.find((p: any) => String(p.id) === id),
    [products, id]
  );
  const [imageUrl, setImageUrl] = useState<string>('');
  const [selectedColors, setSelectedColors] = useState<string[]>(() => {
    if (product?.colors && Array.isArray(product.colors)) return product.colors;
    return [];
  });
  const [selectedSizes, setSelectedSizes] = useState<
    { size: string; count: number }[]
  >(() => {
    if (Array.isArray(product?.sizes)) return product.sizes;
    return [];
  });
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      image: '',
      price: 0,
      categoryId: '',
      rating: 0,
      reviewCount: 0,
      bestSelling: false,
      featured: false,
      description: '',
      colors: '',
      sizes: '',
      stockStatus: 'In Stock',
      originalPrice: 0,
      discount: 0,
      subcategoryId: '',
      gallery: [],
    },
  });

  // Sync form.categoryId with selectedCategoryId/subcategoryId
  useEffect(() => {
    if (selectedSubcategoryId) {
      form.setValue('subcategoryId', selectedSubcategoryId);
    } else if (selectedCategoryId) {
      form.setValue('categoryId', selectedCategoryId);
    }
  }, [form, selectedCategoryId, selectedSubcategoryId]);

  // Handle gallery image upload
  const handleGalleryFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setGallery((prev) => {
      const next = [...prev];
      next[idx] = { url: '', uploading: true, progress: 0 };
      return next;
    });
    try {
      const url = await uploadToCloudinary(
        file,
        (progress) =>
          setGallery((prev) => {
            const next = [...prev];
            next[idx].progress = progress;
            return next;
          }),
        (uploading) =>
          setGallery((prev) => {
            const next = [...prev];
            next[idx].uploading = uploading;
            return next;
          })
      );
      setGallery((prev) => {
        const next = [...prev];
        next[idx] = { url, uploading: false, progress: null };
        return next;
      });
      // Update form value
      const urls = [...gallery.map((g) => g.url)];
      urls[idx] = url;
      form.setValue('gallery', urls.filter(Boolean), { shouldValidate: true });
    } catch (err) {
      setGallery((prev) => {
        const next = [...prev];
        next[idx] = { url: '', uploading: false, progress: null };
        return next;
      });
      toast({
        title: t('admin.productError', 'Error'),
        description: t(
          'admin.productImageUploadError',
          'Gallery image upload failed.'
        ),
        variant: 'destructive',
      });
    }
  };
  // Handle gallery image delete
  const handleDeleteGalleryImage = (idx: number) => {
    setGallery((prev) => {
      const next = [...prev];
      next[idx] = { url: '', uploading: false, progress: null };
      return next;
    });
    // Update form value
    const urls = [...gallery.map((g) => g.url)];
    urls[idx] = '';
    form.setValue('gallery', urls.filter(Boolean), { shouldValidate: true });
    if (galleryInputRefs.current[idx])
      galleryInputRefs.current[idx]!.value = '';
  };

  // On edit, set initial selectedCategoryId and selectedSubcategoryId
  useEffect(() => {
    if (product?.categoryId) {
      const cat = categories.find((c: any) => c.id === product.categoryId);
      if (cat) {
        if (cat.parentId) {
          setSelectedCategoryId(cat.parentId);
          setSelectedSubcategoryId(cat.id);
        } else {
          setSelectedCategoryId(cat.id);
          setSelectedSubcategoryId(product.subcategoryId ?? '');
        }
      }
    }
  }, [product, categories]);

  useEffect(() => {
    dispatch(fetchCategories());
    if (!products.length) dispatch(fetchProducts());
  }, [dispatch, products.length]);

  useEffect(() => {
    if (product) {
      form.reset({
        title: product.title,
        image: product.image,
        price: product.price,
        originalPrice: product.originalPrice,
        discount: product.discount,
        bestSelling: product.bestSelling ?? false,
        featured: product.featured ?? false,
        rating: product.rating,
        description: product.description ?? '',
        colors: product.colors?.join(', ') ?? '',
        sizes:
          product.sizes?.map((s: any) => `${s.size}:${s.count}`).join(', ') ??
          '',
        stockStatus: product.stockStatus,
        gallery: product.gallery ?? [],
        categoryId: product.categoryId,
        subcategoryId: product.subcategoryId,
      });
      setGallery(() => {
        const initial: any[] = Array(5).fill(null);
        const productGallery = (product?.gallery ?? []).slice(0, 5);
        return initial.map((_, i) =>
          productGallery[i]
            ? { url: productGallery[i], uploading: false, progress: null }
            : { url: '', uploading: false, progress: null }
        );
      });
      setSelectedColors(() => {
        if (product?.colors && Array.isArray(product.colors))
          return product.colors;
        return [];
      });
      setSelectedSizes(() => {
        if (Array.isArray(product?.sizes)) return product.sizes;
        return [];
      });
      setImageUrl(product?.image ?? '');
    }
  }, [product, form]);

  // Handle color add
  const handleAddColor = (color: string) => {
    if (selectedColors.length >= MAX_COLORS || selectedColors.includes(color))
      return;
    const next = [...selectedColors, color];
    setSelectedColors(next);
    form.setValue('colors', next.join(', '), { shouldValidate: true });
  };
  // Handle color remove
  const handleRemoveColor = (color: string) => {
    const next = selectedColors.filter((c) => c !== color);
    setSelectedColors(next);
    form.setValue('colors', next.join(', '), { shouldValidate: true });
  };

  // Handle size select/deselect
  const handleToggleSize = (size: string) => {
    const exists = selectedSizes.find((s) => s.size === size);
    let next;
    if (exists) {
      next = selectedSizes.filter((s) => s.size !== size);
    } else {
      next = [...selectedSizes, { size, count: 0 }];
    }
    setSelectedSizes(next);
    form.setValue('sizes', next.map((s) => `${s.size}:${s.count}`).join(', '), {
      shouldValidate: true,
    });
  };
  // Handle stock count change
  const handleSizeCountChange = (size: string, count: number) => {
    const next = selectedSizes.map((s) =>
      s.size === size ? { ...s, count } : s
    );
    setSelectedSizes(next);
    form.setValue('sizes', next.map((s) => `${s.size}:${s.count}`).join(', '), {
      shouldValidate: true,
    });
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      console.log('data====', data);

      if (id && product) {
        await dispatch(
          updateProduct({
            ...product,
            ...data,
            gallery: gallery.map((g) => g.url).filter(Boolean),
            colors: data.colors
              ? data.colors.split(',').map((c) => c.trim())
              : undefined,
            sizes: data.sizes
              ? data.sizes.split(',').map((s) => {
                  const [size, count] = s.split(':').map((v) => v.trim());
                  return { size, count: Number(count) };
                })
              : undefined,
          })
        ).unwrap();
        toast({
          title: t('admin.editProductSuccess', 'Product updated!'),
          description: t(
            'admin.editProductSuccessDesc',
            'The product was updated successfully.'
          ),
          variant: 'success',
        });
      } else {
        await dispatch(
          addProduct({
            title: data.title,
            image: data.image,
            price: data.price,
            originalPrice: data.originalPrice,
            discount: data.discount,
            bestSelling: data.bestSelling,
            featured: data.featured,
            rating: data.rating ?? 0,
            reviewCount: data.reviewCount ?? 0,
            description: data.description,
            colors: data.colors
              ? data.colors.split(',').map((c) => c.trim())
              : undefined,
            categoryId: selectedCategoryId,
            subcategoryId: selectedSubcategoryId,
            sizes: data.sizes
              ? data.sizes.split(',').map((s) => {
                  const [size, count] = s.split(':').map((v) => v.trim());
                  return { size, count: Number(count) };
                })
              : undefined,
            stockStatus: data.stockStatus,
            gallery: gallery.map((g) => g.url).filter(Boolean),
          })
        ).unwrap();
        toast({
          title: t('admin.addProductSuccess', 'Product added!'),
          description: t(
            'admin.addProductSuccessDesc',
            'The product was added successfully.'
          ),
          variant: 'success',
        });
      }
      router.push('/admin/products');
    } catch (err: any) {
      toast({
        title: t('admin.productError', 'Error'),
        description:
          err.message ?? t('admin.productErrorDesc', 'Something went wrong.'),
        variant: 'destructive',
      });
    }
  };

  return {
    form,
    imageUrl,
    setImageUrl,
    uploadProgress,
    setUploadProgress,
    uploading,
    setUploading,
    fileInputRef,
    gallery,
    setGallery,
    galleryInputRefs,
    selectedCategoryId,
    setSelectedCategoryId,
    selectedSubcategoryId,
    setSelectedSubcategoryId,
    selectedColors,
    setSelectedColors,
    selectedSizes,
    setSelectedSizes,
    handleAddColor,
    handleRemoveColor,
    handleToggleSize,
    handleSizeCountChange,
    handleGalleryFileChange,
    handleDeleteGalleryImage,
    onSubmit,
    MAX_COLORS,
  };
}

export default useAdminProductForm;
