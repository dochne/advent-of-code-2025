export const createMemo = () => {
  const cache: Record<string, unknown> = {};
  return <T>(key: string, block: () => T) => {
    return (cache[key] ??= block()) as T;
  };
};
