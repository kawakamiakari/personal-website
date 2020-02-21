import scrollTo from 'gatsby-plugin-smoothscroll';
import PropTypes from 'prop-types';
import React from 'react';

import SidemenuStyles from '../styles/sidemenu.module.scss';

const Sidemenu = ({ siteTitle }) => {
  function inactive() {
    const links = document.getElementsByClassName(`${SidemenuStyles.link}`);
    for (const link of links) {
      link.classList.remove(`${SidemenuStyles.active}`);
    }
  }

  function active(e) {
    inactive();
    e.target.classList.add(`${SidemenuStyles.active}`);
  }

  return (
    <div className={SidemenuStyles.container}>
      <span
        className={`${SidemenuStyles.link} ${SidemenuStyles.title}`}
        onClick={() => {
          scrollTo('#top');
          inactive();
        }}
      >
        {siteTitle}
      </span>
      <div className={SidemenuStyles.navs}>
        <span
          className={SidemenuStyles.link}
          onClick={e => {
            scrollTo('#about');
            active(e);
          }}
        >
          ワタシ
        </span>
        <span
          className={SidemenuStyles.link}
          onClick={e => {
            scrollTo('#skill');
            active(e);
          }}
        >
          スキル
        </span>
        <span
          className={SidemenuStyles.link}
          onClick={e => {
            scrollTo('#work');
            active(e);
          }}
        >
          ワーク
        </span>
        <div className={SidemenuStyles.underline} />
      </div>
    </div>
  );
};

Sidemenu.propTypes = {
  siteTitle: PropTypes.string,
};

Sidemenu.defaultProps = {
  siteTitle: ``,
};

export default Sidemenu;
