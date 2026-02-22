import type {Dispatch, SetStateAction} from 'react';

import {useCallback, useState} from 'react';

type UseBooleanReturn = {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
  onTrue: () => void;
  onFalse: () => void;
  toggle: () => void;
};

export function useBoolean(defaultValue = false): UseBooleanReturn {
  const [value, setValue] = useState(defaultValue);

  const onTrue = useCallback(() => {
    setValue(true);
  }, []);

  const onFalse = useCallback(() => {
    setValue(false);
  }, []);

  const toggle = useCallback(() => {
    setValue(x => !x);
  }, []);

  return {value, setValue, onTrue, onFalse, toggle};
}
