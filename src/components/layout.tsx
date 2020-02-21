/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import '../styles/common.scss';
import '../styles/layout.css';
import '../styles/my-layout.scss';

import Background from '../components/background';
import Sidemenu from '../components/sidemenu';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <div className="background">
        <Background />
      </div>
      <div className="sidemenu">
        <Sidemenu siteTitle={data.site.siteMetadata.title} />
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
