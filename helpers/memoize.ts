export const createMemo = <T>() => {
  const cache: Record<string, T> = {};
  return (key: string, block: () => T) => {
    return (cache[key] ??= block());
  };
};
