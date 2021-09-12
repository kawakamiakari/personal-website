import React, { useContext } from 'react';

import { AppStateContext } from './store';

import TopStyles from '../styles/top.module.scss';

const TopPage: React.FC = () => {
  const { siteTitle } = useContext(AppStateContext);

  return (
    <div id="top" className={`page ${TopStyles.page}`}>
      <div className={TopStyles.container}>
        <div className={TopStyles.background}>
          <div className={TopStyles.letters}>
            <p className={TopStyles.title}>{siteTitle}</p>
            <p className={TopStyles.description}>web application engineer</p>
          </div>
        </div>
      </div>
      <div className={TopStyles.scroll_indicator} />
    </div>
  );
};

export default TopPage;
