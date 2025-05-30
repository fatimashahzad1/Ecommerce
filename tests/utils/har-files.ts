import fs from 'fs';

export function extractCategoriesFromHAR(harPath: string): any[] {
  const har = JSON.parse(fs.readFileSync(harPath, 'utf-8'));
  const entry = har.log.entries.find((e: any) =>
    e.request.url.includes('/api/categories')
  );
  if (entry?.response?.content?.text) {
    try {
      return JSON.parse(entry.response.content.text);
    } catch (err) {
      console.error('Failed to parse categories JSON from HAR:', err);
    }
  }

  return [];
}
