/**
 * Category type definitions
 */
export interface SubCategory {
  name: string;
  href: string;
}

export interface NavCategory {
  name: string;
  href: string;
  hasSubmenu?: boolean;
  subCategories?: SubCategory[];
}

export interface Category {
  id: string;
  icon: string;
  name: string;
  parentId?: string;
  subCategories?: Category[];
}
