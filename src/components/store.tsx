import React, { createContext, useEffect, useReducer } from 'react';
import { throttle } from 'throttle-debounce';

export interface Store {
  page: 'top' | 'about' | 'skill' | 'work';
  onScroll: Array<() => void>;
}

const initialState: Store = {
  page: 'top',
  onScroll: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'OnScrollFuncAdd':
      state.onScroll.push(action.value);
      return state;

    case 'pageChange':
      return action.value !== state.page
        ? { ...state, page: action.value }
        : state;

    default:
      return state;
  }
};

export const AppStateContext = createContext<Store>(initialState);
export const AppDispatchContext = createContext<
  React.Dispatch<React.SetStateAction<Store>>
>(() => {});

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
    dispatch({
      type: 'pageChange',
      value: page,
    });

    state.onScroll.forEach(func => func());
  };

  useEffect(() => {
    window.addEventListener('scroll', throttle(200, onScroll), false);
  }, []);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};
