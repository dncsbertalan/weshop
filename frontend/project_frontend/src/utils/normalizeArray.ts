export function normalizeArray<T>(data: T | T[]): T[] {
  if (Array.isArray(data)) return data;
  if (data === null || data === undefined) return [];
  return [data];
}
