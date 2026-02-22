import queryClient from '@/QueryClient/queryClient';

const cleanCache = async () => {
  queryClient.clear();
  cleanCookies();
  localStorage.clear();
  sessionStorage.clear();
};

const cleanCookies = () => {
  document.cookie.split(';').forEach(cookie => {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  });
};

export {cleanCache};
