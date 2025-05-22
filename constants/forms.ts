import { FormField } from '@/types/forms';

export const NAME_FORM_FIELD = {
  name: 'name',
  placeholder: 'contact.form.fields.name',
  type: 'text',
};

export const EMAIL_FORM_FIELD = {
  name: 'email',
  placeholder: 'contact.form.fields.email',
  type: 'email',
};

export const PHONE_FORM_FIELD = {
  name: 'phone',
  placeholder: 'contact.form.fields.phone',
  type: 'tel',
};

export const MESSAGE_FORM_FIELD = {
  name: 'message',
  placeholder: 'contact.form.fields.message',
  type: 'text',
};

export const CONTACT_US_FORM_FIELDS = [
  NAME_FORM_FIELD,
  EMAIL_FORM_FIELD,
  PHONE_FORM_FIELD,
  MESSAGE_FORM_FIELD,
];

// Default values for ContactForm
export const CONTACT_US_FORM_DEFAULT_VALUES = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

// Default values for SignUpForm
export const SIGN_UP_FORM_DEFAULT_VALUES = {
  name: '',
  emailOrPhone: '',
  password: '',
};

export const LOGIN_FORM_DEFAULT_VALUES = {
  emailOrPhone: '',
  password: '',
};
export const FORGOT_PASSWORD_FORM_DEFAULT_VALUES = {
  email: '',
};

export const RESET_PASSWORD_FORM_DEFAULT_VALUES = {
  password: '',
  confirmPassword: '',
};

export const BILLING_FORM_DEFAULT_VALUES = {
  name: '',
  companyName: '',
  streetAddress: '',
  apartment: '',
  city: '',
  phoneNumber: '',
  email: '',
  saveInfo: false,
};

// Field definitions for SignUpForm
export const SIGN_UP_FORM_FIELDS = [
  {
    name: 'name',
    type: 'text',
    placeholder: 'signup.form.fields.name',
  },
  {
    name: 'emailOrPhone',
    type: 'text',
    placeholder: 'signup.form.fields.emailOrPhone',
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'signup.form.fields.password',
  },
];

// Field definitions for LoginForm
export const LOGIN_FORM_FIELDS: FormField[] = [
  {
    name: 'emailOrPhone',
    type: 'text',
    placeholder: 'login.form.fields.emailOrPhone',
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'login.form.fields.password',
  },
];

// Field definitions for ResetPasswordForm
export const RESET_PASSWORD_FORM_FIELDS: FormField[] = [
  {
    name: 'password',
    type: 'password',
    placeholder: 'resetPassword.form.fields.password',
  },
  {
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'resetPassword.form.fields.confirmPassword',
  },
];

export const BILLING_FORM_FIELDS: FormField[] = [
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    required: true,
  },
  {
    name: 'companyName',
    type: 'text',
    label: 'Company Name',
  },
  {
    name: 'streetAddress',
    type: 'text',
    label: ' Street Address ',
    required: true,
  },
  { name: 'city', type: 'text', label: 'City', required: true },
  {
    name: 'apartment',
    type: 'text',
    label: 'Apartment, floor, etc. (optional)',
  },
  {
    name: 'phoneNumber',
    type: 'tel',
    label: 'Phone Number',
    required: true,
  },
  { name: 'email', type: 'text', label: 'Email Address', required: true },
  {
    name: 'saveInfo',
    type: 'checkbox',
    label: 'Save this information for faster check-out next time',
    required: false,
  },
];

export const ADMIN_PRODUCT_FORM_FIELDS = [
  {
    name: 'image',
    labelKey: 'admin.productImage',
    defaultLabel: 'Image',
    type: 'text',
    isCustom: true, // Will be handled separately
  },
  {
    name: 'title',
    labelKey: 'admin.productTitle',
    defaultLabel: 'Product Title',
    type: 'text',
  },

  {
    name: 'price',
    labelKey: 'admin.productPrice',
    defaultLabel: 'Price',
    type: 'number',
  },
  {
    name: 'originalPrice',
    labelKey: 'admin.productOriginalPrice',
    defaultLabel: 'Original Price',
    type: 'number',
  },
  {
    name: 'discount',
    labelKey: 'admin.productDiscount',
    defaultLabel: 'Discount',
    type: 'number',
  },
  {
    name: 'rating',
    labelKey: 'admin.productRating',
    defaultLabel: 'Rating',
    type: 'number',
    step: '0.1',
    min: 0,
    max: 5,
  },
  {
    name: 'description',
    labelKey: 'admin.productDescription',
    defaultLabel: 'Description',
    type: 'textarea',
  },
];
