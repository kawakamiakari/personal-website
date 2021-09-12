import React from 'react';

import PageTitleStyles from '../styles/pagetitle.module.scss';

type Props = {
  color?: string;
  title: string;
};

const PageTitle: React.FC<Props> = ({ color = '#343530', title }) => (
  <div className={PageTitleStyles.container}>
    <p className={PageTitleStyles.pagetitle} style={{ color }}>
      {title}
    </p>
    <div className={PageTitleStyles.underline} />
  </div>
);
PageTitle.defaultProps = {
  color: '#343530',
};

export default PageTitle;
