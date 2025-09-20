
import { useState, useCallback } from 'react';

export const useToggle = (initialState = false): [boolean, () => void, (state: boolean) => void] => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => setState(s => !s), []);
  
  const set = useCallback((newState: boolean) => setState(newState), []);

  return [state, toggle, set];
};
