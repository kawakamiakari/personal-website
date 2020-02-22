import React, { Component } from 'react';

import PageTitle from '../components/pagetitle';

class Work extends Component {
  public render() {
    return (
      <div id="work" className="page page-work">
        <PageTitle color="#dde1df" title="ワーク" />
        <div>Hello Work-page</div>
      </div>
    );
  }
}

export default Work;
