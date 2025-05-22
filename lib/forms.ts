// Removed duplicate import of getContactUsFormSchema to avoid merged declaration error.
import i18next from 'i18next';
import * as z from 'zod';

const t = i18next.t;

// Helper function to validate email or phone
export const isValidEmailOrPhone = (value: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
  const phoneRegex = /^\d{10,15}$/; // Phone number regex (10-15 digits)
  return emailRegex.test(value) || phoneRegex.test(value);
};

// Schema for ContactForm validation
export const getContactUsFormSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(2, {
      message: t('contact.form.validation.name'),
    }),
    email: z.string().email({
      message: t('contact.form.validation.email'),
    }),
    phone: z.string().min(10, {
      message: t('contact.form.validation.phone'),
    }),
    message: z
      .string()
      .min(10, {
        message: t('contact.form.validation.message'),
      })
      .optional()
      .or(z.literal('')),
  });

// Schema for LoginForm validation
export const getLoginFormSchema = (t: (key: string) => string) =>
  z.object({
    emailOrPhone: z.string().refine(isValidEmailOrPhone, {
      message: t('login.form.validation.emailOrPhone'),
    }),
    password: z
      .string()
      .min(6, { message: t('login.form.validation.password') }),
  });

// Schema for SignUpForm validation
export const getSignUpFormSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(2, { message: t('signup.form.validation.name') }),
    emailOrPhone: z.string().refine(isValidEmailOrPhone, {
      message: t('signup.form.validation.emailOrPhone'),
    }),
    password: z
      .string()
      .min(6, { message: t('signup.form.validation.password') }),
  });

// Schema for ResetPasswordForm validation
export const getResetPasswordFormSchema = (t: (key: string) => string) =>
  z
    .object({
      password: z
        .string()
        .min(6, { message: t('resetPassword.form.validation.password') }),
      confirmPassword: z.string().min(6, {
        message: t('resetPassword.form.validation.confirmPassword'),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('resetPassword.form.validation.passwordMismatch'),
      path: ['confirmPassword'],
    });

// Schema for ForgotPasswordForm validation
export const getForgotPasswordFormSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t('forgotPassword.form.validation.email') })
      .email({ message: t('forgotPassword.form.validation.invalidEmail') }),
  });

export const getCouponSchema = (t: (key: string) => string) =>
  z
    .object({
      // Coupon code is optional; if provided, it must be '123ABC'
      couponCode: z
        .string()
        .optional()
        .refine(
          (code) => code === undefined || code === '' || code === '123ABC',
          {
            message: 'Invalid coupon code',
          }
        ),
    })
    .strict();

export const getBillingFormSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(2, t('billing.form.validation.name')),
    companyName: z.string().optional(),
    streetAddress: z
      .string()
      .min(5, t('billing.form.validation.streetAddress')),
    apartment: z.string().optional(),
    city: z.string().min(2, t('billing.form.validation.city')),
    phoneNumber: z
      .string()
      .min(10, t('billing.form.validation.phoneNumber.min'))
      .regex(/^\d+$/, t('billing.form.validation.phoneNumber.regex')),
    email: z.string().email(t('billing.form.validation.email')),
    saveInfo: z.boolean(),
  });

export const getProductFormSchema = (t: (key: string) => string) =>
  z.object({
    title: z.string().min(2, t('product.form.validation.title')),
    image: z.string().url(t('product.form.validation.image')),
    price: z.coerce.number().min(0, t('product.form.validation.price')),
    originalPrice: z.coerce.number().optional(),
    discount: z.coerce.number().optional(),
    reviewCount: z.coerce.number().optional(),
    bestSelling: z.boolean().optional(),
    featured: z.boolean().optional(),
    rating: z.coerce.number().min(0).max(5).optional(),
    description: z.string().optional(),
    colors: z.string().optional(), // comma separated
    sizes: z.string().optional(), // comma separated (size:count)
    stockStatus: z
      .enum(['In Stock', 'Out of Stock', 'Limited Stock'])
      .optional(),
    categoryId: z.string().nonempty(t('product.form.validation.categoryId')),
    subcategoryId: z.string().optional(),
    gallery: z.array(z.string().url()).max(5).optional(),
  });
