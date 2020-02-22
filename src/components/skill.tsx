import React, { Component } from 'react';

import PageTitle from '../components/pagetitle';

class Skill extends Component {
  public render() {
    return (
      <div id="skill" className="page">
        <PageTitle title="スキル" />
        <div>Hello Skill-page</div>
      </div>
    );
  }
}

export default Skill;
