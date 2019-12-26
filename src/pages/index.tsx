import React from 'react';

import Kaleidoscope from '../components/kaleidoscope';
import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Kaleidoscope />
  </Layout>
);

export default IndexPage;
