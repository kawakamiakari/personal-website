import React, { Component } from 'react';

import TopStyles from '../styles/top.module.scss';

interface Props {
  siteTitle: string;
}

class TopPage extends Component<Props, {}> {
  public render() {
    return (
      <div id="top" className={`page ${TopStyles.page}`}>
        <div className={TopStyles.container}>
          <div className={TopStyles.background}>
            <div className={TopStyles.letters}>
              <p className={TopStyles.title}>{this.props.siteTitle}</p>
              <p className={TopStyles.description}>web application engineer</p>
            </div>
          </div>
        </div>
        <div className={TopStyles.scroll_indicator} />
      </div>
    );
  }
}

export default TopPage;
