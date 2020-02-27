import React, { Component } from 'react';

import AboutStyles from '../styles/about.module.scss';

import PageTitle from '../components/pagetitle';

class About extends Component {
  public render() {
    return (
      <div id="about" className={`page ${AboutStyles.page}`}>
        <PageTitle title="ワタシについて" />
        <div className={AboutStyles.contents}>
          <div className={AboutStyles.photo}>
            <div className={AboutStyles.square} />
            <div className={AboutStyles.circle} />
          </div>
          <div className={AboutStyles.description}>
            <p className={AboutStyles.name}>川上 明里</p>
            <p>
              1993年広島生まれ、神奈川在住。
              <br />
              工学部情報系学科卒。
              <br />
              好き) ねこ/ゲーム/焼肉/炭酸/絵を描くこと
            </p>
            <p>
              ソフトウェアを通じて
              <br />
              <b>体験を売る仕事がしたい</b>と思っています。
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
