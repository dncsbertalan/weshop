export function objectToFormData(obj: Record<string, unknown>): FormData {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((v) => formData.append(key, v));
    } else if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    } else if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      formData.append(key, value.toString());
    } else if (typeof value === "object") {
      formData.append(key, JSON.stringify(value));
    }
  });

  return formData;
}
