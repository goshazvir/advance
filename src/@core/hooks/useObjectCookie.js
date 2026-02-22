// React Imports
import {useMemo} from 'react';
// Third-party Imports
import {useCookie} from 'react-use';

export const useObjectCookie = (key, fallback) => {
  // Hooks
  const [valStr, updateCookie] = useCookie(key);

  const value = useMemo(
    () => (valStr ? JSON.parse(valStr) : fallback),
    [valStr],
  );

  const updateValue = newVal => {
    updateCookie(JSON.stringify(newVal));
  };

  return [value, updateValue];
};
