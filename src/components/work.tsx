import React, { Component } from 'react';

import SkillStyles from '../styles/work.module.scss';

import PageTitle from '../components/pagetitle';

class WorkPage extends Component {
  public render() {
    return (
      <div id="work" className={`page ${SkillStyles.page}`}>
        <PageTitle color="#dde1df" title="ワーク" />
        <div>Hello Work-page</div>
      </div>
    );
  }
}

export default WorkPage;
