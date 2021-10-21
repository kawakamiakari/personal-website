/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';

import '../styles/layout.css';

import '../styles/common.scss';
import '../styles/layout.scss';

import Background from './background';
import Sidemenu from './sidemenu';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <div className="background">
        <Background />
      </div>
      <div className="sidemenu">
        <Sidemenu />
      </div>
      <div className="main_contents">
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
