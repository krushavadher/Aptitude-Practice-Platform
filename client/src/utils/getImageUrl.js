import { API_BASE_URL } from '../api/axios';

export const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('blob:')) {
    return url;
  }
  const baseUrl = API_BASE_URL.replace(/\/api\/?$/, '');
  return `${baseUrl}${url}`;
};
