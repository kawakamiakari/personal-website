// import { graphql, useStaticQuery } from 'gatsby';
import React, { createContext, useEffect, useReducer } from 'react';
import { throttle } from 'throttle-debounce';

import { Page } from '../types/page';
import { Action } from '../utilities/action';
import reducer from '../utilities/reducer';

// const data = useStaticQuery(graphql`
//   query SiteTitleQuery {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//   }
// `);

export interface Store {
  siteTitle: string;
  page: Page;
  onScroll: Array<() => void>;
}

const initialState: Store = {
  // siteTitle: data.site.siteMetadata.title,
  siteTitle: 'カワカミアカリ',
  page: 'top',
  onScroll: [],
};

export const AppStateContext = createContext<Store>(initialState);
export const AppDispatchContext = createContext<React.Dispatch<Action>>(
  () => {}
);

export const Provider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getPage = () => {
    const pages = {
      top: document.querySelector('#top'),
      about: document.querySelector('#about'),
      skill: document.querySelector('#skill'),
      work: document.querySelector('#work'),
    };

    let page: Page;
    Object.keys(pages).forEach(key => {
      const clientRectTop = pages[key as Page].getBoundingClientRect().top;
      const { innerHeight } = window;
      if (clientRectTop <= innerHeight / 2) {
        page = key as Page;
      }
    });

    return page;
  };

  const onScroll: () => void = () => {
    const page = getPage();
    dispatch({
      type: 'pageChange',
      page,
    });

    state.onScroll.forEach(func => func());
  };

  useEffect(() => {
    window.addEventListener('scroll', throttle(200, onScroll), false);
  }, [onScroll, state.onScroll]);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};
