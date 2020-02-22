import PropTypes from 'prop-types';
import React from 'react';

import PageTitleStyles from '../styles/pagetitle.module.scss';

const PageTitle = ({ color, title }) => (
  <div className={PageTitleStyles.container}>
    <p className={PageTitleStyles.pagetitle} style={{ color }}>
      {title}
    </p>
    <div className={PageTitleStyles.underline} />
  </div>
);

PageTitle.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string.isRequired,
};

PageTitle.defaultProps = {
  color: `#343530`,
  title: ``,
};

export default PageTitle;
