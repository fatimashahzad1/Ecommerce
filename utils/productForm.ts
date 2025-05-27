import type { Category } from '@/types/categories';

// Colors: string <-> string[]
export function parseColors(colors?: string): string[] {
  if (!colors) return [];
  return colors
    .split(',')
    .map((c) => c.trim())
    .filter(Boolean);
}
export function formatColors(colors: string[]): string {
  return colors.join(', ');
}

// Sizes: string <-> { size: string, count: number }[]
export interface SizeStock {
  size: string;
  count: number;
}
export function parseSizes(sizes?: string): SizeStock[] {
  if (!sizes) return [];
  return sizes
    .split(',')
    .map((s) => {
      const [size, count] = s.split(':').map((v) => v.trim());
      return { size, count: Number(count) };
    })
    .filter((s) => s.size);
}
export function formatSizes(sizes: SizeStock[]): string {
  return sizes.map((s) => `${s.size}:${s.count}`).join(', ');
}

// Category options builder (for flat select lists, if needed)
export function buildCategoryOptions(categories: Category[]) {
  const parents = categories.filter((cat) => !cat.parentId);
  const children = categories.filter((cat) => cat.parentId);
  return parents.flatMap((parent) => [
    { label: parent.name, value: parent.id, isParent: true },
    ...children
      .filter((child) => child.parentId === parent.id)
      .map((child) => ({
        label: `— ${child.name}`,
        value: child.id,
        isParent: false,
      })),
  ]);
}
