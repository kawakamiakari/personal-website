import React, { createContext, useEffect, useState } from 'react';
import { throttle } from 'throttle-debounce';

export interface Store {
  page: 'top' | 'about' | 'skill' | 'work';
}

const initialState: Store = {
  page: 'top',
};

export const AppContext = createContext(initialState);

export const Provider = ({ children }) => {
  const [state, dispatch]: [Store, any] = useState(initialState);

  const getPage = () => {
    const pages = {
      top: document.querySelector('#top'),
      about: document.querySelector('#about'),
      skill: document.querySelector('#skill'),
      work: document.querySelector('#work'),
    };

    let page;
    for (const key of Object.keys(pages)) {
      const clientRectTop = pages[key].getBoundingClientRect().top;
      const innerHeight = window.innerHeight;
      if (clientRectTop <= innerHeight / 2) {
        page = key;
      }
    }

    return page;
  };

  const onScroll: () => void = () => {
    const page = getPage();
    dispatch(prev => (page === prev.page ? prev : { ...prev, page }));
  };

  useEffect(() => {
    window.addEventListener('scroll', throttle(200, onScroll), false);
  }, []);

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};
