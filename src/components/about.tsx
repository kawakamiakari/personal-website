import React, { Component } from 'react';

import AboutStyles from '../styles/about.module.scss';

import PageTitle from '../components/pagetitle';

class About extends Component {
  public render() {
    return (
      <div id="about" className={`page ${AboutStyles.page}`}>
        <PageTitle title="ワタシについて" />
        <div>content</div>
      </div>
    );
  }
}

export default About;
