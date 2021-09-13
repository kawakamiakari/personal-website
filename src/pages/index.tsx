import React from 'react';

import About from '../components/about';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Skill from '../components/skill';
import Provider from '../components/store';
import Top from '../components/top';
import Work from '../components/work';

const IndexPage: React.FC = () => {
  return (
    <Provider>
      <Layout>
        <SEO />
        <Top />
        <About />
        <Skill />
        <Work />
      </Layout>
    </Provider>
  );
};

export default IndexPage;
