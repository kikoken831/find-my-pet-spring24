export const exclude = <T, Key extends keyof T>(
  model: T,
  keys: Key[],
): Omit<T, Key> => {
  return Object.fromEntries(
    Object.entries(model as any).filter(([key]) => !keys.includes(key as Key)),
  ) as Omit<T, Key>
}
