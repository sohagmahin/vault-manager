// local services
export const storeLocalData = (key, value) => {
  return localStorage.setItem(key, value);
};

export const getLocalData = (key) => {
  return localStorage.getItem(key);
};
