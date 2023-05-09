import React, { useContext, useEffect } from 'react';

import ProfileJPG from '../images/profile.jpg';
import GitHubIcon from '../images/github_icon.svg';
import TwitterIcon from '../images/twitter_icon.png';
import AboutStyles from '../styles/about.module.scss';

import PageTitle from './pagetitle';
import { AppDispatchContext } from './store';

const AboutPage = React.memo(() => {
  const dispatch = useContext(AppDispatchContext);

  const updatePerspective = () => {
    const element: HTMLElement = document.querySelector(
      `.${AboutStyles.parallax}`
    );
    const clientRectTop = element.getBoundingClientRect().top;
    const { innerHeight } = window;

    const perspectiveY =
      ((innerHeight / 2 - clientRectTop) / element.clientHeight) * 100;
    element.style.perspectiveOrigin = `0% ${perspectiveY}%`;
  };

  useEffect(() => {
    dispatch({
      type: 'onScrollFuncAdd',
      func: updatePerspective,
    });
  }, [dispatch]);

  return (
    <div id="about" className={`page ${AboutStyles.page}`}>
      <PageTitle title="ワタシについて" />
      <div className={AboutStyles.contents}>
        <div className={`${AboutStyles.photo} ${AboutStyles.parallax}`}>
          <div
            className={`${AboutStyles.square} ${AboutStyles.parallax_forward}`}
          />
          <div
            className={`${AboutStyles.circle} ${AboutStyles.parallax_front}`}
          >
            <img src={ProfileJPG} alt="" />
          </div>
        </div>
        <div className={AboutStyles.description}>
          <p className={AboutStyles.name}>川上 明里</p>
          <p>
            1993年広島生まれ、神奈川在住。
            <br />
            工学部情報系学科卒。
            <br />
            好き → ねこ/旅行/ゲーム/焼肉/炭酸/絵を描くこと
            <br />
            キャンプと熱帯魚(淡水)はじめました。
          </p>
          <p>
            ソフトウェアを通じて
            <br />
            <b>体験を売る仕事がしたい</b>と思っています。
          </p>
          <p className={AboutStyles.contact}>
            <a href="https://github.com/kawakamiakari">
              <img src={GitHubIcon} alt="GitHub" />
            </a>
            <a href="https://twitter.com/kawakamiakari">
              <img src={TwitterIcon} alt="twitter" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
});

export default AboutPage;
