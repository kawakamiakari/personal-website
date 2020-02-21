import React from 'react';

import About from '../components/about';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Skill from '../components/skill';
import Top from '../components/top';
import Work from '../components/work';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Top />
    <About />
    <Skill />
    <Work />
  </Layout>
);

export default IndexPage;
