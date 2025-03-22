export const getStorageItem = (name: string) => {
  const token = localStorage.getItem(name);
  return token;
};
