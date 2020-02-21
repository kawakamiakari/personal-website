import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import SidemenuStyles from '../styles/sidemenu.module.scss';

const Sidemenu = ({ siteTitle }) => (
  <div className={SidemenuStyles.container}>
    <Link to="/" className={`${SidemenuStyles.link} ${SidemenuStyles.title}`}>
      {siteTitle}
    </Link>
    <Link to="/" className={SidemenuStyles.link}>
      ワタシ
    </Link>
    <Link to="/" className={SidemenuStyles.link}>
      スキル
    </Link>
    <Link to="/" className={SidemenuStyles.link}>
      ワーク
    </Link>
  </div>
);

Sidemenu.propTypes = {
  siteTitle: PropTypes.string,
};

Sidemenu.defaultProps = {
  siteTitle: ``,
};

export default Sidemenu;
