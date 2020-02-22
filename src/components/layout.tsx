/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import PropTypes from 'prop-types';
import React from 'react';

import '../styles/layout.css';

import '../styles/common.scss';
import '../styles/layout.scss';

import Background from '../components/background';
import Sidemenu from '../components/sidemenu';

const Layout = ({ children, siteTitle }) => {
  return (
    <>
      <div className="background">
        <Background />
      </div>
      <div className="sidemenu">
        <Sidemenu siteTitle={siteTitle} />
      </div>
      <div className="main-contents">
        <main>{children}</main>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
