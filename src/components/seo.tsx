/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from 'gatsby';
import React, { useContext } from 'react';
import Helmet from 'react-helmet';

import { AppStateContext } from './store';
import { PageLang } from '../utilities/constants';

type Props = {
  description?: string;
  lang?: string;
  meta?: any[];
};

const SEO: React.FC<Props> = ({ description = '', lang = 'ja', meta = [] }) => {
  const { page } = useContext(AppStateContext);

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={PageLang.ja[page]}
      titleTemplate={`${site.siteMetadata.title} | %s`}
      meta={[
        {
          content: metaDescription,
          name: `description`,
        },
        {
          content: site.siteMetadata.title,
          property: `og:title`,
        },
        {
          content: metaDescription,
          property: `og:description`,
        },
        {
          content: `website`,
          property: `og:type`,
        },
        {
          content: `summary`,
          name: `twitter:card`,
        },
        {
          content: site.siteMetadata.author,
          name: `twitter:creator`,
        },
        {
          content: site.siteMetadata.title,
          name: `twitter:title`,
        },
        {
          content: metaDescription,
          name: `twitter:description`,
        },
      ].concat(meta)}
    />
  );
};

export default SEO;
