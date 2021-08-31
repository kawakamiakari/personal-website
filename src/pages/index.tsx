import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

import About from '../components/about';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Skill from '../components/skill';
import { Provider } from '../components/store';
import Top from '../components/top';
import Work from '../components/work';

const IndexPage = () => {
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
    <Provider>
      <Layout siteTitle={data.site.siteMetadata.title}>
        <SEO title="Home" />
        <Top siteTitle={data.site.siteMetadata.title} />
        <About />
        <Skill />
        <Work />
      </Layout>
    </Provider>
  );
};

export default IndexPage;
