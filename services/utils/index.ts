const CONTRIBHUB_ORIGIN_DOMAIN = `${process.env.NEXT_PUBLIC_CONTRIBHUB_ORIGIN_DOMAIN}`;
const CONTRIBHUB_STORAGE_URL = `${process.env.NEXT_PUBLIC_STORAGE_URL}`;

export const getUri = (path: string) => {
  return `${CONTRIBHUB_ORIGIN_DOMAIN}${path}`;
};

export const getStorageUrl = (path: string) => {
  return `${CONTRIBHUB_STORAGE_URL}${path}`;
};

export const isDevEnvironment = (): boolean => {
  return process.env.NODE_ENV === 'development';
};