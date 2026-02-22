export const collectFieldValuesByKey = (
  obj: unknown,
  keyToFind: string,
): string[] => {
  const result: string[] = [];

  const traverse = (value: unknown) => {
    if (Array.isArray(value)) {
      value.forEach(traverse);
    } else if (value && typeof value === 'object') {
      for (const [key, val] of Object.entries(value)) {
        if (key === keyToFind && typeof val === 'string') {
          result.push(val);
        }
        traverse(val);
      }
    }
  };

  traverse(obj);
  return result;
};
