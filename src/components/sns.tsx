import React, { useContext, useEffect } from 'react';

import { AppStateContext } from './store';

import GitHubIcon from '../images/github_icon.svg';
import TwitterIcon from '../images/twitter_icon.png';
import SNSStyles from '../styles/sns.module.scss';

const SNS: React.FC = () => {
  const { page } = useContext(AppStateContext);

  useEffect(() => {
    const sns = document.querySelector('#sns');
    if (page === 'top') {
      sns.classList.add(SNSStyles.hidden);
    } else {
      sns.classList.remove(SNSStyles.hidden);
    }
  }, [page]);

  return (
    <div id="sns" className={`${SNSStyles.sns} ${SNSStyles.hidden}`}>
      <a href="https://github.com/kawakamiakari">
        <img src={GitHubIcon} alt="GitHub" />
      </a>
      <a href="https://twitter.com/kawakamiakari">
        <img src={TwitterIcon} alt="twitter" />
      </a>
    </div>
  );
};

export default SNS;
